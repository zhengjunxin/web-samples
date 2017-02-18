优化 Recalculate Style


优化前
scripting 0.7ms
rendering 28.4ms
painting 32.1ms
总计：61.2 mst
其中 rendering 阶段的 Recalculate Style 11.13 ms 影响 3000 个元素

优化后 
scripting 2.9ms
rendering 26.6ms
painting 29.7ms
总计：59.2 ms
其中 rendering 阶段的 Recalculate Style 3.75 ms 影响 1500 个元素