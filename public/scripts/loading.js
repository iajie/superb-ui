/* eslint-disable no-var */
/**
 * loading 占位
 * 解决首次加载时白屏的问题 其中浏览器的下载地址在nginx目录中的dist目录中
 */
(function () {
  var downUrl = './dist/Chrome谷歌浏览器.exe';
  var _root = document.querySelector('#root');
  var agent = navigator.userAgent.toLowerCase();
  if (_root && _root.innerHTML === '') {
    if (agent.indexOf('chrome') > 0) {
      _root.innerHTML =
        '<style>\n' +
        '        html,\n' +
        '        body,\n' +
        '        #root {\n' +
        '          height: 100%;\n' +
        '          margin: 0;\n' +
        '          padding: 0;\n' +
        '        }\n' +
        '        #root {\n' +
        '          background-repeat: no-repeat;\n' +
        '          background-size: 100% auto;\n' +
        '        }\n' +
        '\n' +
        '        .loading-title {\n' +
        '          font-size: 1.1rem;\n' +
        '        }\n' +
        '\n' +
        '        .loading-sub-title {\n' +
        '          margin-top: 20px;\n' +
        '          font-size: 1rem;\n' +
        '          color: #888;\n' +
        '        }\n' +
        '\n' +
        '        .page-loading-warp {\n' +
        '          display: flex;\n' +
        '          align-items: center;\n' +
        '          justify-content: center;\n' +
        '          padding: 26px;\n' +
        '        }\n' +
        '        .ant-spin {\n' +
        '          position: absolute;\n' +
        '          display: none;\n' +
        '          -webkit-box-sizing: border-box;\n' +
        '          box-sizing: border-box;\n' +
        '          margin: 0;\n' +
        '          padding: 0;\n' +
        '          color: rgba(0, 0, 0, 0.65);\n' +
        '          color: #1890ff;\n' +
        '          font-size: 14px;\n' +
        '          font-variant: tabular-nums;\n' +
        '          line-height: 1.5;\n' +
        '          text-align: center;\n' +
        '          list-style: none;\n' +
        '          opacity: 0;\n' +
        '          -webkit-transition: -webkit-transform 0.3s\n' +
        '            cubic-bezier(0.78, 0.14, 0.15, 0.86);\n' +
        '          transition: -webkit-transform 0.3s\n' +
        '            cubic-bezier(0.78, 0.14, 0.15, 0.86);\n' +
        '          transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n' +
        '          transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),\n' +
        '            -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n' +
        '          -webkit-font-feature-settings: "tnum";\n' +
        '          font-feature-settings: "tnum";\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-spinning {\n' +
        '          position: static;\n' +
        '          display: inline-block;\n' +
        '          opacity: 1;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot {\n' +
        '          position: relative;\n' +
        '          display: inline-block;\n' +
        '          width: 20px;\n' +
        '          height: 20px;\n' +
        '          font-size: 20px;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot-item {\n' +
        '          position: absolute;\n' +
        '          display: block;\n' +
        '          width: 9px;\n' +
        '          height: 9px;\n' +
        '          background-color: #1890ff;\n' +
        '          border-radius: 100%;\n' +
        '          -webkit-transform: scale(0.75);\n' +
        '          -ms-transform: scale(0.75);\n' +
        '          transform: scale(0.75);\n' +
        '          -webkit-transform-origin: 50% 50%;\n' +
        '          -ms-transform-origin: 50% 50%;\n' +
        '          transform-origin: 50% 50%;\n' +
        '          opacity: 0.3;\n' +
        '          -webkit-animation: antspinmove 1s infinite linear alternate;\n' +
        '          animation: antSpinMove 1s infinite linear alternate;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot-item:nth-child(1) {\n' +
        '          top: 0;\n' +
        '          left: 0;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot-item:nth-child(2) {\n' +
        '          top: 0;\n' +
        '          right: 0;\n' +
        '          -webkit-animation-delay: 0.4s;\n' +
        '          animation-delay: 0.4s;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot-item:nth-child(3) {\n' +
        '          right: 0;\n' +
        '          bottom: 0;\n' +
        '          -webkit-animation-delay: 0.8s;\n' +
        '          animation-delay: 0.8s;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot-item:nth-child(4) {\n' +
        '          bottom: 0;\n' +
        '          left: 0;\n' +
        '          -webkit-animation-delay: 1.2s;\n' +
        '          animation-delay: 1.2s;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-dot-spin {\n' +
        '          -webkit-transform: rotate(45deg);\n' +
        '          -ms-transform: rotate(45deg);\n' +
        '          transform: rotate(45deg);\n' +
        '          -webkit-animation: antrotate 1.2s infinite linear;\n' +
        '          animation: antRotate 1.2s infinite linear;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-lg .ant-spin-dot {\n' +
        '          width: 32px;\n' +
        '          height: 32px;\n' +
        '          font-size: 32px;\n' +
        '        }\n' +
        '\n' +
        '        .ant-spin-lg .ant-spin-dot i {\n' +
        '          width: 14px;\n' +
        '          height: 14px;\n' +
        '        }\n' +
        '\n' +
        '        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n' +
        '          .ant-spin-blur {\n' +
        '            background: #fff;\n' +
        '            opacity: 0.5;\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @-webkit-keyframes antSpinMove {\n' +
        '          to {\n' +
        '            opacity: 1;\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @keyframes antSpinMove {\n' +
        '          to {\n' +
        '            opacity: 1;\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @-webkit-keyframes antRotate {\n' +
        '          to {\n' +
        '            -webkit-transform: rotate(405deg);\n' +
        '            transform: rotate(405deg);\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @keyframes antRotate {\n' +
        '          to {\n' +
        '            -webkit-transform: rotate(405deg);\n' +
        '            transform: rotate(405deg);\n' +
        '          }\n' +
        '        }\n' +
        '      </style>\n' +
        '\n' +
        '      <div style="\n' +
        '        display: flex;\n' +
        '        flex-direction: column;\n' +
        '        align-items: center;\n' +
        '        justify-content: center;\n' +
        '        height: 100%;\n' +
        '        min-height: 362px;\n' +
        '      ">\n' +
        '        <div class="page-loading-warp">\n' +
        '          <div class="ant-spin ant-spin-lg ant-spin-spinning">\n' +
        '            <span class="ant-spin-dot ant-spin-dot-spin">\n' +
        '              <i class="ant-spin-dot-item"></i>\n' +
        '              <i class="ant-spin-dot-item"></i>\n' +
        '              <i class="ant-spin-dot-item"></i>\n' +
        '              <i class="ant-spin-dot-item"></i>\n' +
        '            </span>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="loading-title">\n' +
        '          正在加载资源\n' +
        '        </div>\n' +
        '        <div class="loading-sub-title">\n' +
        '          初次加载资源可能需要较多时间 请耐心等待\n' +
        '        </div>\n' +
        '      </div>';
    } else {
      _root.innerHTML =
        '<style>\n' +
        '        html,\n' +
        '        body,\n' +
        '        #root {\n' +
        '          height: 100%;\n' +
        '          margin: 0;\n' +
        '          padding: 0;\n' +
        '        }\n' +
        '        #root {\n' +
        '          background-repeat: no-repeat;\n' +
        '          background-size: 100% auto;\n' +
        '        }\n' +
        '\n' +
        '        .loading-title {\n' +
        '          font-size: 1.1rem;\n' +
        '        }\n' +
        '\n' +
        '        .loading-sub-title {\n' +
        '          margin-top: 20px;\n' +
        '          font-size: 1rem;\n' +
        '          color: #888;\n' +
        '        }\n' +
        '\n' +
        '        .page-loading-warp {\n' +
        '          display: flex;\n' +
        '          align-items: center;\n' +
        '          justify-content: center;\n' +
        '          padding: 26px;\n' +
        '        }\n' +
        '\n' +
        '        .ant-alert {\n' +
        '          box-sizing: border-box;\n' +
        '          margin: 0;\n' +
        '          padding: 8px 12px;\n' +
        '          color: rgba(0, 0, 0, 0.88);\n' +
        '          width: 30%;\n' +
        '          font-size: 14px;\n' +
        '          line-height: 1.5714285714285714;\n' +
        '          list-style: none;\n' +
        '          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n' +
        '            "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",\n' +
        '            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n' +
        '          position: relative;\n' +
        '          display: flex;\n' +
        '          align-items: center;\n' +
        '          word-wrap: break-word;\n' +
        '          border-radius: 8px;\n' +
        '        }\n' +
        '\n' +
        '        .ant-alert-warning {\n' +
        '          background-color: #fffbe6;\n' +
        '          border: 1px solid #ffe58f;\n' +
        '        }\n' +
        '\n' +
        '        .ant-alert-with-description {\n' +
        '          align-items: flex-start;\n' +
        '          padding-inline: 24px;\n' +
        '          padding-block: 20px;\n' +
        '        }\n' +
        '\n' +
        '        .ant-alert .ant-alert-content {\n' +
        '          flex: 1;\n' +
        '          min-width: 0;\n' +
        '        }\n' +
        '\n' +
        '        .ant-alert-with-description .ant-alert-message {\n' +
        '          display: block;\n' +
        '          margin-bottom: 8px;\n' +
        '          color: rgba(0, 0, 0, 0.88);\n' +
        '          font-size: 16px;\n' +
        '          font-weight: 600;\n' +
        '        }\n' +
        '\n' +
        '        @-webkit-keyframes antSpinMove {\n' +
        '          to {\n' +
        '            opacity: 1;\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @keyframes antSpinMove {\n' +
        '          to {\n' +
        '            opacity: 1;\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @-webkit-keyframes antRotate {\n' +
        '          to {\n' +
        '            -webkit-transform: rotate(405deg);\n' +
        '            transform: rotate(405deg);\n' +
        '          }\n' +
        '        }\n' +
        '\n' +
        '        @keyframes antRotate {\n' +
        '          to {\n' +
        '            -webkit-transform: rotate(405deg);\n' +
        '            transform: rotate(405deg);\n' +
        '          }\n' +
        '        }\n' +
        '      </style>\n' +
        '\n' +
        '      <div\n' +
        '        style="\n' +
        '          background: linear-gradient(#1991fa, #d1e9fe);\n' +
        '          height: 100%;\n' +
        '          display: flex;\n' +
        '          min-height: 362px;\n' +
        '          flex-direction: column;\n' +
        '          justify-content: center;\n' +
        '          align-items: center;\n' +
        '        "\n' +
        '      >\n' +
        '        <div\n' +
        '          class="ant-alert ant-alert-warning ant-alert-with-description ant-alert-no-icon css-ed5zg0"\n' +
        '        >\n' +
        '          <div class="ant-alert-content">\n' +
        '            <div class="ant-alert-message">浏览器使用提示</div>\n' +
        '            <div class="ant-alert-description">\n' +
        '              本系统暂不支持该浏览器的访问使用，请使用\n' +
        '              <a\n' +
        '                href="' +
        downUrl +
        '"\n' +
        '                >Chrome（谷歌浏览器）</a\n' +
        '              >进行使用！\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>';
    }
  }
})();
