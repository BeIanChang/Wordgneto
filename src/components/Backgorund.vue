<template>
    <div id="background" class="anim">
      <img src="@/assets/img/moon.png" alt="" id="moon" style="display:none">
      <Transition name="fade">
        <canvas ref="canvas" v-show="settingStore.theme === 'dark'"/>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from "vue"; // 引入 Vue 的生命周期钩子函数
  import { useSettingStore } from "@/stores/setting.ts"; // 引入设置 store
  
  const canvas = $ref<HTMLCanvasElement>(); // 定义一个 canvas 元素的引用
  const settingStore = useSettingStore(); // 使用设置 store
  
  onMounted(() => {
    let ctx = canvas.getContext("2d"); // 获取 canvas 的 2D 上下文
    canvas.width = window.innerWidth; // 设置 canvas 宽度
    canvas.height = window.innerHeight; // 设置 canvas 高度
    let maxRadius = 1,
        stars = []; // 初始化最大半径和星星数组
  
    // 定义星星类
    let Star = function (x: number, y: number, r: number) {
      this.x = x;
      this.y = y;
      this.r = r;
    };
    Star.prototype = {
      paint: function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255," + this.r + ")";
        ctx.fill();
        ctx.restore();
      },
    };
  
    // 画背景星星
    function drawBg() {
      for (let i = 0; i < 1000; i++) {
        let r = Math.random() * maxRadius;
        let x = Math.random() * canvas.width;
        let y = Math.random() * 2 * canvas.height - canvas.height;
        let star = new Star(x, y, r);
        stars.push(star);
        star.paint();
      }
    }
  
    drawBg();
  
    // 画月亮
    function drawMoon() {
      let moon: HTMLImageElement = document.getElementById("moon");
      let centerX = canvas.width - 200,
          centerY = 100,
          width = 80;
  
      let index = 0;
      for (let i = 0; i < 10; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
            centerX + width / 2,
            centerY + width / 2,
            width / 2 + index,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "rgba(240,219,120,0.05)";
        index += 2;
        ctx.fill();
        ctx.restore();
      }
      if (moon.complete) {
        ctx.drawImage(moon, centerX, centerY, width, width);
      } else {
        moon.onload = function () {
          ctx.drawImage(moon, centerX, centerY, width, width);
        };
      }
    }
  
    drawMoon(); // 调用画月亮函数
  });
  </script>
  
  <style scoped lang="scss">
  #background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: var(--color-main-bg);
  
    canvas {
      width: 100vw;
      height: 100vh;
    }
  }
  </style>
  