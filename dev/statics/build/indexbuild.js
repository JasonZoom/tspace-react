(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Log = require('./Log.js');
ReactDOM.render(React.createElement(Log, null), document.getElementById('viewbox'));

},{"./Log.js":2}],2:[function(require,module,exports){
var Login = React.createClass({displayName: "Login",
			  getInitialState:function(){
			  		return {
			  			username:"112",
			  			password:"1212"
			  		}
			  },
			  changeHandle:function(ev){
			  		this.state[ev.target.name] = this.state[ev.target.value];
			  },
			  loginHandle:function(ev){
			  	console.log(this.state);
			  },
			  render: function(){
			    return (
			    	React.createElement("div", null, 
				    	React.createElement("header", null, 
							"TSpace"
						), 
						React.createElement("section", null, 
							React.createElement("div", {className: "tac pd20 fs24"}, 
								"分享心情的空间，记录美好的时刻"
							), 
							React.createElement("div", {className: "login-box"}, 
								React.createElement("div", {className: "frombox fs30 mb20"}, 
									React.createElement("input", {type: "text", placeholder: "用户名", name: "username", ref: "username", defaultValue: this.state.username, onChange: this.changeHandle})
								), 
								React.createElement("div", {className: "frombox fs30 mb20"}, 
									React.createElement("input", {type: "password", placeholder: "密码", name: "password", ref: "password", defaultValue: this.state.password, onChange: this.changeHandle})
								), 
								React.createElement("div", {className: "frombox fs30 mt40"}, 
									React.createElement("a", {href: "javascript:;", onClick: this.loginHandle}, "登录")
								)
							)
							
						)
					    
					)
			    )
			  }
});

module.exports = Login;

},{}]},{},[1]);
