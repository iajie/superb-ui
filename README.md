# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

`antd 5`
`antd pro 5`

`图标库为阿里云矢量图标库`
```js
// 获取图标名称和值脚本
var iconDomlist = document.querySelectorAll('.block-icon-list')[1].querySelectorAll('li')
var getIconCode = function(i) {
	if (i < iconDomlist.length) { 
		setTimeout(function() {
			let iconCode = iconDomlist[i].querySelector('.icon-code-show').innerText
            let iconName = iconDomlist[i].querySelector('.icon-name').innerText
			console.log("{ label: React.createElement('span', {}, React.createElement(IconFont, { type: '"+iconCode+"' }), '"+iconName+"'), value: '" + iconCode + "'},")
            getIconCode(i + 1);
			}, 1); 
        
	} 
}
getIconCode(0)
```