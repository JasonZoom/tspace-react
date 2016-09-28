var Login = React.createClass({
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
			    	<div >
				    	<header>
							TSpace
						</header>
						<section>
							<div className="tac pd20 fs24">
								分享心情的空间，记录美好的时刻
							</div>
							<div className="login-box">
								<div className="frombox fs30 mb20">
									<input type="text" placeholder="用户名" name="username" ref="username"   defaultValue ={this.state.username} onChange={this.changeHandle}/>
								</div>
								<div className="frombox fs30 mb20">
									<input type="password" placeholder="密码" name="password" ref="password" defaultValue ={this.state.password} onChange={this.changeHandle}/>
								</div>
								<div className="frombox fs30 mt40">
									<a href="javascript:;" onClick={this.loginHandle}>登录</a>
								</div>
							</div>
							
						</section>
					    
					</div>
			    )
			  }
});

module.exports = Login;