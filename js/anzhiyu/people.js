"use strict";
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(e, r) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === t && e.constructor && (t = e.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(e)
        : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(e, r)
        : void 0
    );
  }
}

function _iterableToArray(e) {
  if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
}

function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e);
}

function _arrayLikeToArray(e, r) {
  (null == r || r > e.length) && (r = e.length);
  for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
  return a;
}

function _classCallCheck(e, r) {
  if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var a = r[t];
    (a.enumerable = a.enumerable || !1),
      (a.configurable = !0),
      "value" in a && (a.writable = !0),
      Object.defineProperty(e, a.key, a);
  }
}

function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e;
}

/* ========== 原代码（已注释） - 切割图片模式 ========== */
/*
var peopleConfig = {
    src: GLOBAL_CONFIG.peoplecanvas.img,
    rows: 15,
    cols: 7,
  },
  randomRange = function (e, r) {
    return e + Math.random() * (r - e);
  },
  randomIndex = function (e) {
    return 0 | randomRange(0, e.length);
  },
  removeFromArray = function (e, r) {
    return e.splice(r, 1)[0];
  },
  removeItemFromArray = function (e, r) {
    return removeFromArray(e, e.indexOf(r));
  },
  removeRandomFromArray = function (e) {
    return removeFromArray(e, randomIndex(e));
  },
  getRandomFromArray = function (e) {
    return e[0 | randomIndex(e)];
  },
  resetPeep = function (e) {
    var r,
      t,
      a = e.stage,
      n = e.peep,
      o = 0.5 < Math.random() ? 1 : -1,
      i = 100 - 250 * gsap.parseEase("power2.in")(Math.random()),
      s = a.height - n.height + i;
    return (
      1 == o ? ((r = -n.width), (t = a.width), (n.scaleX = 1)) : ((r = a.width + n.width), (t = 0), (n.scaleX = -1)),
      (n.x = r),
      (n.y = s),
      {
        startX: r,
        startY: (n.anchorY = s),
        endX: t,
      }
    );
  },
  normalWalk = function (e) {
    var r = e.peep,
      t = e.props,
      a = (t.startX, t.startY),
      n = t.endX,
      o = gsap.timeline();
    return (
      o.timeScale(randomRange(0.5, 1.5)),
      o.to(
        r,
        {
          duration: 10,
          x: n,
          ease: "none",
        },
        0
      ),
      o.to(
        r,
        {
          duration: 0.25,
          repeat: 40,
          yoyo: !0,
          y: a - 10,
        },
        0
      ),
      o
    );
  },
  walks = [normalWalk],
  Peep = (function () {
    function a(e) {
      var r = e.image,
        t = e.rect;
      _classCallCheck(this, a),
        (this.image = r),
        this.setRect(t),
        (this.x = 0),
        (this.y = 0),
        (this.anchorY = 0),
        (this.scaleX = 1),
        (this.walk = null);
    }
    return (
      _createClass(a, [
        {
          key: "setRect",
          value: function (e) {
            (this.rect = e),
              (this.width = e[2]),
              (this.height = e[3]),
              (this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height]));
          },
        },
        {
          key: "render",
          value: function (e) {
            e.save(),
              e.translate(this.x, this.y),
              e.scale(this.scaleX, 1),
              e.drawImage.apply(e, _toConsumableArray(this.drawArgs)),
              e.restore();
          },
        },
      ]),
      a
    );
  })(),
  img = document.createElement("img");
(img.onload = init), (img.src = peopleConfig.src);
let peoplecanvasEl = document.getElementById("peoplecanvas");

let ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined,
  stage = {
    width: 0,
    height: 0,
  },
  allPeeps = [],
  availablePeeps = [],
  crowd = [],
  isbindPjax = false;

function cleanupPeopleCanvas() {
  window.removeEventListener("resize", resize);
  gsap.ticker.remove(render);
  crowd.forEach(function (e) {
    if (e.walk) e.walk.kill();
  });
  crowd.length = 0;
  availablePeeps.length = 0;
}

function init() {
  if (!peoplecanvasEl) return;
  // 如果 allPeeps 已有数据，先清空避免重复
  if (allPeeps.length === 0) {
    createPeeps();
  }
  resize();
  gsap.ticker.add(render);
  window.addEventListener("resize", resize);
}

if (!isbindPjax) {
  isbindPjax = true;
  document.addEventListener("pjax:send", function () {
    // 离开页面时清理
    cleanupPeopleCanvas();
  });
  document.addEventListener("pjax:success", function () {
    peoplecanvasEl = document.getElementById("peoplecanvas");
    if (peoplecanvasEl) {
      ctx = peoplecanvasEl.getContext("2d");
      setTimeout(function () {
        if (!peoplecanvasEl) return;
        resize();
        gsap.ticker.add(render);
        window.addEventListener("resize", resize);
      }, 300);
    }
  });
}

function createPeeps() {
  for (
    var e = peopleConfig.rows,
      r = peopleConfig.cols,
      t = e * r,
      a = img.naturalWidth / e,
      n = img.naturalHeight / r,
      o = 0;
    o < t;
    o++
  )
    allPeeps.push(
      new Peep({
        image: img,
        rect: [(o % e) * a, ((o / e) | 0) * n, a, n],
      })
    );
}

function resize() {
  if (peoplecanvasEl && peoplecanvasEl.clientWidth != 0) {
    (stage.width = peoplecanvasEl.clientWidth),
      (stage.height = peoplecanvasEl.clientHeight),
      (peoplecanvasEl.width = stage.width * devicePixelRatio),
      (peoplecanvasEl.height = stage.height * devicePixelRatio),
      crowd.forEach(function (e) {
        e.walk.kill();
      }),
      (crowd.length = 0),
      (availablePeeps.length = 0),
      availablePeeps.push.apply(availablePeeps, allPeeps),
      initCrowd();
  }
}

function initCrowd() {
  for (; availablePeeps.length; ) addPeepToCrowd().walk.progress(Math.random());
}

function addPeepToCrowd() {
  var e = removeRandomFromArray(availablePeeps),
    r = getRandomFromArray(walks)({
      peep: e,
      props: resetPeep({
        peep: e,
        stage: stage,
      }),
    }).eventCallback("onComplete", function () {
      removePeepFromCrowd(e), addPeepToCrowd();
    });
  return (
    (e.walk = r),
    crowd.push(e),
    crowd.sort(function (e, r) {
      return e.anchorY - r.anchorY;
    }),
    e
  );
}

function removePeepFromCrowd(e) {
  removeItemFromArray(crowd, e), availablePeeps.push(e);
}

function render() {
  if (!peoplecanvasEl) return;
  (peoplecanvasEl.width = peoplecanvasEl.width),
    ctx.save(),
    ctx.scale(devicePixelRatio, devicePixelRatio),
    crowd.forEach(function (e) {
      e.render(ctx);
    }),
    ctx.restore();
}
*/

/* ========== 新代码 - 完整图片走路模式 (已修复PJAX返回不显示问题) ========== */

var peopleConfig = {
    src: GLOBAL_CONFIG.peoplecanvas.img,
    scale: 0.08,   // 图片缩放比例 8%
    count: 20,     // 显示的图片数量
    jumpHeight: 15,// 漂浮振幅加大，让缓慢的漂浮更有呼吸感
    speedMin: 12,  // 最快走完时间(秒) - 变慢，更优雅
    speedMax: 35,  // 最慢走完时间(秒) - 变慢，更优雅
  },
  img = document.createElement("img");

(img.onload = init), (img.src = peopleConfig.src);
let peoplecanvasEl = document.getElementById("peoplecanvas");
let ctx = peoplecanvasEl ? peoplecanvasEl.getContext("2d") : undefined;
let stage = { width: 0, height: 0 };
let walkers = [];
let lastTime = 0;
let isbindPjax = false;
let animationFrameId = null; // 【新增】用于保存动画的ID，方便切页面时销毁

// 走路对象类 - 从左到右或从右到左循环平滑漂浮
var Walker = (function () {
  function a(e) {
    _classCallCheck(this, a);
    this.direction = Math.random() > 0.5 ? 1 : -1; 
    this.speed = e.speed; 
    this.scale = e.scale || 1;
    this.jumpHeight = e.jumpHeight || 15;
    this.jumpFreq = e.jumpFreq || 0.2; // 极低频率
    this.opacity = e.opacity || 0.8;
    this.delay = e.delay || 0; 
    this.active = false; 

    // 初始化位置：从屏幕外开始
    if (this.direction > 0) {
      this.x = -50;
    } else {
      this.x = stage.width + 50;
    }

    this.resetYPosition();
    this.y = this.baseY;
    this.jumpPhase = Math.random() * Math.PI * 2;
    this.elapsedTime = 0; 
  }

  _createClass(a, [
    {
      key: "update",
      value: function (dt) {
        if (!this.active) {
          this.elapsedTime += dt;
          if (this.elapsedTime >= this.delay) {
            this.active = true;
            if (this.direction > 0) {
              this.x = -50;
            } else {
              this.x = stage.width + 50;
            }
          }
          return; 
        }

        // 水平移动
        this.x += this.direction * this.speed * dt;

        // 上下平滑漂浮 (纯正弦波)
        this.jumpPhase += this.jumpFreq * dt * Math.PI * 2;
        this.y = this.baseY + Math.sin(this.jumpPhase) * this.jumpHeight;

        // 到达边界后重置到另一边
        if (this.direction > 0 && this.x > stage.width + 60) {
          this.x = -60;
          this.resetYPosition();
        } else if (this.direction < 0 && this.x < -60) {
          this.x = stage.width + 60;
          this.resetYPosition();
        }
      }
    },
    {
      key: "resetYPosition",
      value: function () {
        var imgHalfH = (img.height * this.scale) / 2; 
        
        // 预留底部卡片的遮挡距离（大约65像素）
        var bottomMargin = 65; 
        
        // 起始位置控制在偏下半区 (45%往下)
        var minY = stage.height * 0.45; 
        
        // 最大 Y 值 = 屏幕高度 - 图片半高 - 漂浮振幅 - 底部安全遮挡距离
        var maxY = stage.height - imgHalfH - this.jumpHeight - bottomMargin; 
        
        // 防止极端情况下高度不够导致反转
        if (maxY < minY) {
            maxY = minY + 10;
        }
        
        this.baseY = minY + Math.random() * (maxY - minY);
      }
    },
    {
      key: "render",
      value: function (e) {
        if (!this.active) return;
        e.save();
        e.globalAlpha = this.opacity;
        e.translate(this.x, this.y);
        e.scale(this.scale * this.direction, this.scale); 
        e.drawImage(img, -img.width / 2, -img.height / 2);
        e.restore();
      }
    }
  ]);

  return a;
})();

function cleanupPeopleCanvas() {
  window.removeEventListener("resize", resize);
  walkers.length = 0;
  // 【新增】离开页面时，干净利落地关掉动画进程
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function init() {
  if (!peoplecanvasEl) return;
  resize();
  createWalkers();
  lastTime = performance.now();
  renderLoop();
  window.addEventListener("resize", resize);
}

function createWalkers() {
  walkers.length = 0;
  var count = peopleConfig.count;
  for (var i = 0; i < count; i++) {
    var duration = peopleConfig.speedMin + Math.random() * (peopleConfig.speedMax - peopleConfig.speedMin);
    var speed = (stage.width + 120) / duration; 

    walkers.push(
      new Walker({
        scale: peopleConfig.scale * (0.7 + Math.random() * 0.6),
        speed: speed,
        jumpHeight: peopleConfig.jumpHeight * (0.8 + Math.random() * 0.4),
        jumpFreq: 0.2 + Math.random() * 0.25, 
        opacity: 0.3 + Math.random() * 0.6, 
        delay: i * (0 + Math.random() * 0.8) 
      })
    );
  }
}

function resize() {
  if (!peoplecanvasEl || peoplecanvasEl.clientWidth == 0) return;
  stage.width = peoplecanvasEl.clientWidth;
  stage.height = peoplecanvasEl.clientHeight;
  peoplecanvasEl.width = stage.width * devicePixelRatio;
  peoplecanvasEl.height = stage.height * devicePixelRatio;
  createWalkers();
}

function renderLoop() {
  if (!peoplecanvasEl) return;

  var now = performance.now();
  var dt = (now - lastTime) / 1000; 
  lastTime = now;

  if (dt > 0.1) dt = 0.016; 

  peoplecanvasEl.width = peoplecanvasEl.width;
  ctx.save();
  ctx.scale(devicePixelRatio, devicePixelRatio);
  walkers.forEach(function (w) {
    w.update(dt);
    w.render(ctx);
  });
  ctx.restore();

  // 【修改】记录动画ID，用于PJAX切换时销毁
  animationFrameId = requestAnimationFrame(renderLoop);
}

if (!isbindPjax) {
  isbindPjax = true;
  document.addEventListener("pjax:send", function () {
    cleanupPeopleCanvas();
  });
  document.addEventListener("pjax:success", function () {
    peoplecanvasEl = document.getElementById("peoplecanvas");
    if (peoplecanvasEl) {
      ctx = peoplecanvasEl.getContext("2d");
      setTimeout(function () {
        if (!peoplecanvasEl) return;
        resize();
        createWalkers();
        lastTime = performance.now();
        // 【核心修复】重新回到页面时，把动画引擎再次启动！
        renderLoop(); 
        window.addEventListener("resize", resize);
      }, 300);
    }
  });
}