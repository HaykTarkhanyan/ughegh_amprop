"""Build the 20-person friendship network for the friendship-paradox short and count the paradox in it.

A powerlaw-cluster graph (networkx, n=20, m=2, p=0.3, seed 509): friend groups with triangles plus a few popular
people. For each person: their friend count and the mean friend count of their friends. Writes
friendship/build/network.json (nodes with degree, friends' mean and a fixed 2D layout scaled to the safe area,
edges, summary) for the renderer, so the numbers in the script are reproducible.

Usage (from 03_shorts/):  python friendship/network.py
Runtime: under 1 s. networkx 3.7.
"""
import json
import logging
import statistics as st
import sys
from pathlib import Path

import networkx as nx

ROOT = Path(__file__).resolve().parents[2]
(ROOT / "logs").mkdir(exist_ok=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",
                    handlers=[logging.StreamHandler(sys.stdout),
                              logging.FileHandler(ROOT / "logs" / "friendship_network.log", encoding="utf-8")])
log = logging.getLogger("friendship_network")

SEED = 509
BOX = (160, 330, 840, 980)  # x0, y0, x1, y1 in the 1080x1920 frame: inside the safe area, above the caption band


def main():
    G = nx.powerlaw_cluster_graph(20, 2, 0.3, seed=SEED)
    deg = dict(G.degree())
    friends_mean = {v: st.mean(deg[u] for u in G[v]) for v in G}
    pos = nx.spring_layout(G, seed=SEED, k=0.9, iterations=200)
    xs, ys = [p[0] for p in pos.values()], [p[1] for p in pos.values()]
    sx = (BOX[2] - BOX[0]) / (max(xs) - min(xs))
    sy = (BOX[3] - BOX[1]) / (max(ys) - min(ys))
    nodes = [{"id": v, "degree": deg[v], "friends_mean": round(friends_mean[v], 2),
              "fewer": deg[v] < friends_mean[v],
              "x": round(BOX[0] + (pos[v][0] - min(xs)) * sx, 1), "y": round(BOX[1] + (pos[v][1] - min(ys)) * sy, 1)}
             for v in G]
    mu = st.mean(deg.values())
    var = st.pvariance(deg.values())
    summary = {
        "people": G.number_of_nodes(), "friendships": G.number_of_edges(), "mean_friends": round(mu, 2),
        "mean_of_friends_means": round(st.mean(friends_mean.values()), 2),
        "random_friend_mean": round(sum(d * d for d in deg.values()) / sum(deg.values()), 2),
        "variance": round(var, 2), "mu_plus_var_over_mu": round(mu + var / mu, 2),
        "fewer_than_friends": sum(n["fewer"] for n in nodes),
        "more_than_friends": sum(deg[v] > friends_mean[v] for v in G),
        "max_degree": max(deg.values()),
    }
    out = Path(__file__).resolve().parent / "build" / "network.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps({"summary": summary, "nodes": nodes, "edges": [list(e) for e in G.edges()]}, indent=1),
                   encoding="utf-8")
    for k, v in summary.items():
        log.info("%s: %s", k, v)
    log.info("wrote %s", out)


if __name__ == "__main__":
    main()
