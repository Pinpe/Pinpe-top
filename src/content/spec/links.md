<style>
  .friend-check-list {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
  }
  .friend-check-list li {
    margin-bottom: 0.5em;
  }
  .friend-check-list label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    position: relative;
  }
  .friend-check-list input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 1.15em;
    height: 1.15em;
    flex-shrink: 0;
    margin: 0 0.6em 0 0;
    border: 2px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    background: var(--btn-regular-bg);
    transition: all 0.2s cubic-bezier(.4,0,.2,1);
  }
  .friend-check-list input[type="checkbox"]:hover {
    background: var(--btn-regular-bg-hover);
  }
  .friend-check-list input[type="checkbox"]:active {
    scale: .9;
    background: var(--btn-regular-bg-active);
  }
  .friend-check-list input[type="checkbox"]:checked {
    background: var(--primary);
    border-color: var(--primary);
  }
  .friend-check-list input[type="checkbox"]:checked:hover {
    background: var(--primary);
  }
  .friend-check-list .check-icon {
    position: absolute;
    left: 0;
    width: 1.15em;
    height: 1.15em;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.6);
    transition: all 0.2s cubic-bezier(.4,0,.2,1);
  }
  .friend-check-list input[type="checkbox"]:checked ~ .check-icon {
    opacity: 1;
    transform: scale(1);
  }
  .friend-check-list .check-icon svg {
    width: 0.75em;
    height: 0.75em;
  }
  .friend-check-list .check-icon svg path {
    stroke: #fff;
    transition: stroke 0.3s ease;
  }
  html.dark .friend-check-list .check-icon svg path {
    stroke: #000;
  }
  #friend-info {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.4s cubic-bezier(.4,0,.2,1);
  }
  #friend-info.show {
    opacity: 1;
  }
</style>

# ✨ 想和我做朋友吗？

如果可以的话，我会很开心的！只需要满足简单的要求（在复选框打勾）：

<ul class="friend-check-list">
  <li>
    <label>
      <input type="checkbox" id="cb1">
      <span class="check-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
      </span>
      内容<strong>合法合规</strong>。
    </label>
  </li>
  <li>
    <label>
      <input type="checkbox" id="cb2">
      <span class="check-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
      </span>
      是<strong>博客网站</strong>，或至少有<strong>博客板块</strong>的个人网站。
    </label>
  </li>
  <li>
    <label>
      <input type="checkbox" id="cb3">
      <span class="check-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
      </span>
      提前添加我网站的链接。
    </label>
  </li>
</ul>

<div id="friend-info">

🎉 恭喜！看起来条件全部满足了，你可以在任何地方联系我（例如 [留言](https://pinpe.top/comment/) 或 [邮箱](mailto:813233375@qq.com) ），发送留言时至少需要包含以下信息：

|需要包含的信息|我的信息|
|:--|:--|
|网站名称 | Pinpe 的云端|
|网址 | https://pinpe.top|
|头像 URL | https://pinpe.top/head.jpg|
|介绍 | 一片属于自己的云朵。|

</div>

<script>
  (function() {
    const checkboxes = [1,2,3].map(n => document.getElementById('cb' + n));
    const info = document.getElementById('friend-info');

    function update() {
      const allChecked = checkboxes.every(cb => cb.checked);
      if (allChecked) {
        info.classList.add('show');
        info.style.maxHeight = info.scrollHeight + 'px';
      } else {
        info.style.maxHeight = info.scrollHeight + 'px';
        requestAnimationFrame(() => {
          info.classList.remove('show');
          info.style.maxHeight = '0px';
        });
      }
    }

    // 收起动画结束后把 maxHeight 清掉，防止窗口 resize 时内容被裁
    info.addEventListener('transitionend', () => {
      if (!info.classList.contains('show')) {
        info.style.maxHeight = '';
      }
    });

    checkboxes.forEach(cb => cb.addEventListener('change', update));
  })();
</script>