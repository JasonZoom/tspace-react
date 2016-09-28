(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Log = require('./Log1.js');
ReactDOM.render(React.createElement(Log, null), document.getElementById('login-box'));

},{"./Log1.js":2}],2:[function(require,module,exports){
var UserInput = require('./UserInput3.js');
var PwInput = require('./PwInput2.js');
var Login = React.createClass({displayName: "Login",
			  getInitialState:function(){
			  		return {
			  			username:"112",
			  			password:"1212"
			  		}
			  },
			  getChildState:function(state){
			  	for(var k in state){
			  		this.state[k] = state[k];
			  	}
			  },
			  loginHandle:function(ev){
			  	console.log(this.state);
			  },
			  render: function(){
			    return (
			    	React.createElement("div", null, 
					    React.createElement(UserInput, {mystate: this.getChildState}), 
						React.createElement(PwInput, {mystate: this.getChildState}), 
						React.createElement("div", {className: "frombox fs30 mt40"}, 
							React.createElement("a", {href: "javascript:;", onClick: this.loginHandle}, "登录")
						)
					)
			    )
			  }
});

module.exports = Login;

},{"./PwInput2.js":3,"./UserInput3.js":4}],3:[function(require,module,exports){
var PwInput = React.createClass({displayName: "PwInput",
			  getInitialState:function(){
			  		return {
			  			password:""
			  		}
			  },
			  changeHandle:function(ev){
			  	var state = {};
			  	state[ev.target.name]=ev.target.value;
			  	this.setState(state);
			  	this.backState();
			  },
			  backState:function(){
			  		this.props.mystate(this.state);
			  },
			  render: function(){
			    return (
			    	React.createElement("div", {className: "frombox fs30 mb20"}, 
						React.createElement("input", {type: "password", placeholder: "密码", name: "password", ref: "password", defaultValue: this.state.password, onChange: this.changeHandle})
					)
			    )
			  }
});

module.exports = PwInput;

},{}],4:[function(require,module,exports){
var UserInput = React.createClass({displayName: "UserInput",
			  getInitialState:function(){
			  		return {
			  			username:""
			  		}
			  },
			  changeHandle:function(ev){
			  	var state = {};
			  	state[ev.target.name]=ev.target.value;
			  	this.setState(state);
			  	this.backState();
			  },
			  backState:function(){
			  		this.props.mystate(this.state);
			  },
			  render: function(){
			    return (
			    	React.createElement("div", {className: "frombox fs30 mb20"}, 
							React.createElement("input", {type: "text", placeholder: "用户名", name: "username", ref: "username", defaultValue: this.state.username, onChange: this.changeHandle})
					)
			    )
			  }
});

module.exports = UserInput;

},{}]},{},[1]);
