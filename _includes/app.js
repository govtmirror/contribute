// Generated by CoffeeScript 1.4.0
(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w={}.hasOwnProperty,E=function(e,t){function r(){this.constructor=e}for(var n in t)w.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};app.views.Application=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.events={"click .toggle-view":"toggleView"},t.prototype.toggleView=function(e){var t,n;return e.preventDefault(),e.stopPropagation(),t=$(e.currentTarget),n=t.attr("href").replace(/^\//,""),$(".toggle-view.active").removeClass("active"),t.addClass("active"),router.navigate(n,!0)},t.prototype.initialize=function(){var e,t,n;return e=function(){if(n.mainView&&n.mainView.refreshCodeMirror)return n.mainView.refreshCodeMirror()},_.bindAll(this),n=this,this.header=new app.views.Header({model:this.model}),t=_.debounce(e,300),$(window).resize(t)},t.prototype.render=function(){return $(this.header.render().el).prependTo(this.el),this},t.prototype.replaceMainView=function(e,t){return $("body").removeClass().addClass("current-view "+e),e!=="start"&&$("#header").show(),this.mainView?this.mainView.remove():$("#main").empty(),this.mainView=t,$(t.el).appendTo(this.$("#main"))},t.prototype["static"]=function(){return this.header.render()},t.prototype.posts=function(e,t,n,r){return this.loading("Loading posts ..."),h(e,t,n,r,_.bind(function(e,t){return this.loaded(),e?this.notify("error","The requested resource could not be found."):(this.header.render(),this.replaceMainView("posts",(new app.views.Posts({model:t,id:"posts"})).render()))},this))},t.prototype.post=function(e,t,n,r,i,s){return this.loading("Loading post ..."),h(e,t,n,r,_.bind(function(o,u){return o?this.notify("error","The requested resource could not be found."):(c(e,t,n,r,i,_.bind(function(e,t){var n;return this.loaded(),this.header.render(),e?this.notify("error","The requested resource could not be found."):(t.preview=s!=="edit",t.lang=_.mode(i),this.replaceMainView(window.authenticated?"post":"read-post",(new app.views.Post({model:t,id:"post"})).render()),n=this)},this)),this.header.render())},this))},t.prototype.newPost=function(e,t,n,r){return this.loading("Creating file ..."),h(e,t,n,r,_.bind(function(s,o){return i(e,t,n,r,_.bind(function(e,t){return this.loaded(),t.jekyll=_.jekyll(r,t.file),t.preview=!1,t.markdown=_.markdown(t.file),this.replaceMainView("post",(new app.views.Post({model:t,id:"post"})).render()),this.mainView._makeDirty(),app.state.file=t.file,this.header.render()},this))},this))},t.prototype.profile=function(e){var t;return t=this,app.state.title=e,this.loading("Loading profile ..."),p(e,function(e,n){return t.header.render(),t.loaded(),n.authenticated=!!window.authenticated,t.replaceMainView("start",(new app.views.Profile({id:"start",model:n})).render())})},t.prototype.start=function(e){var t;return t=this,app.state.title="",this.header.render(),this.replaceMainView("start",(new app.views.Start({id:"start",model:_.extend(this.model,{authenticated:!!window.authenticated})})).render())},t.prototype.notify=function(e,t){return this.header.render(),this.replaceMainView("notification",(new app.views.Notification(e,t)).render())},t.prototype.loading=function(e){return $("#main").html('<div class="loading"><span>'+e||"Loading ...</span></div>")},t.prototype.loaded=function(){return $("#main .loading").remove()},t}(Backbone.View),app.views.Header=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.id="header",t.prototype.events={"click a.logout":"_logout"},t.prototype._logout=function(){return d(),app.instance.render(),$("#start").length>0?app.instance.start():window.location.reload(),!1},t.prototype.render=function(){return $(this.el).html(app.templates.header(_.extend(this.model,{state:app.state}))),this},t}(Backbone.View),app.views.Notification=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.id="notification",t.prototype.initialize=function(e,t){return this.model={},this.model.type=e,this.model.message=t},t.prototype.render=function(){return $(this.el).html(app.templates.notification(this.model)),this},t}(Backbone.View),app.views.Post=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.id="post",t.prototype.events={"click .save":"_save","click .cancel-save":"_toggleCommit","click .save.confirm":"updateFile","click a.toggle.view":"_toggleView","click a.toggle.meta":"_toggleMeta","change input":"_makeDirty","change #post_published":"updateMetaData","click .delete":"_delete","click .toggle-options":"_toggleOptions"},t.prototype._toggleOptions=function(){return $(".options").toggle(),!1},t.prototype._delete=function(){return confirm("Are you sure you want to delete that file?")&&r(app.state.user,app.state.repo,app.state.branch,this.model.path,this.model.file,_.bind(function(e){return e?alert("Error during deletion. Please wait 30 seconds and try again."):router.navigate([app.state.user,app.state.repo,"tree",app.state.branch].join("/"),!0)},this)),!1},t.prototype.updateURL=function(){var e;return e=_.compact([app.state.user,app.state.repo,this.model.preview?"blob":"edit",app.state.branch,this.model.path,this.model.file]),router.navigate(e.join("/"),!1)},t.prototype._makeDirty=function(e){this.dirty=!0,this.editor&&(this.model.content=this.editor.getValue()),this.metadataEditor&&(this.model.raw_metadata=this.metadataEditor.getValue());if(!this.$(".button.save").hasClass("saving"))return this.$(".button.save").html(this.model.writeable?"SAVE":"SUBMIT CHANGE"),this.$(".button.save").removeClass("inactive error")},t.prototype.showDiff=function(){var e,t,n,r;return n=this.prevContent,r=this.serialize(),e=this.dmp.diff_main(n,r),this.dmp.diff_cleanupSemantic(e),t=this.dmp.diff_prettyHtml(e).replace(/&para;/g,""),$(".diff-wrapper .diff").html(t)},t.prototype._toggleCommit=function(){return this.$(".document-menu").hasClass("commit")||this.$(".commit-message").attr("placeholder","Updated "+$("input.filepath").val()),this.hideMeta(),this.$(".button.save").html(this.$(".document-menu").hasClass("commit")?this.model.writeable?"SAVE":"SUBMIT CHANGE":"COMMIT"),this.$(".button.save").toggleClass("confirm"),this.$(".document-menu").toggleClass("commit"),this.$(".button.cancel-save").toggle(),this.$(".document-menu-content .options").hide(),this.showDiff(),this.$(".surface").toggle(),this.$(".diff-wrapper").toggle(),this.$(".commit-message").focus(),!1},t.prototype._save=function(e){return this.dirty?(this._toggleCommit(),e.preventDefault(),!1):!1},t.prototype._toggleView=function(e){var t;return t=this,this.toggleView($(e.currentTarget).attr("data-view")),_.delay(function(){return t.refreshCodeMirror()},1),!1},t.prototype._toggleMeta=function(e){var t;return t=this,e&&e.preventDefault(),$(".toggle.meta").toggleClass("active"),$(".metadata").toggle(),_.delay(function(){return t.refreshCodeMirror()},1),!1},t.prototype.refreshCodeMirror=function(){$(".toggle.meta").hasClass("active")?$(".CodeMirror-scroll").height($(".document").height()/2):$(".CodeMirror-scroll").height($(".document").height()),this.editor.refresh();if(this.metadataEditor)return this.metadataEditor.refresh()},t.prototype.toggleView=function(e){return this.view=e,e==="preview"?(this.model.preview=!0,this.$(".post-content").html(marked(this.model.content))):this.model.preview=!1,this.hideMeta(),this.updateURL(),$(".toggle").removeClass("active"),$(".toggle."+e).addClass("active"),$(".document .surface").removeClass("preview cheatsheet compose"),$(".document .surface").addClass(e)},t.prototype.hideMeta=function(){return $(".toggle.meta").removeClass("active"),$(".metadata").hide()},t.prototype.right=function(){var e;e=$(".toggle.active").attr("data-view");if(e==="preview")return;return e==="compose"?this.toggleView("preview"):this.toggleView("compose")},t.prototype.left=function(){var e;e=$(".toggle.active").attr("data-view");if(e==="cheatsheet")return;return e==="compose"?this.toggleView("cheatsheet"):this.toggleView("compose")},t.prototype.initialize=function(){this.dmp=new diff_match_patch,this.mode="edit",this.prevContent=this.serialize();if(!window.shortcutsRegistered)return key("⌘+s, ctrl+s",_.bind(function(){return this.updateFile(),!1},this)),key("ctrl+shift+right",_.bind(function(){return this.right(),!1},this)),key("ctrl+shift+left",_.bind(function(){return this.left(),!1},this)),key("esc",_.bind(function(){return this.toggleView("compose"),!1},this)),window.shortcutsRegistered=!0},t.prototype.parseMetadata=function(e){e=this.metadataEditor.getValue();if(!e)return{};try{return jsyaml.load(e)}catch(t){return null}},t.prototype.updateMetaData=function(){var e,t;return t=function(e,t){var n;return n=/published: (false|true)/,e.match(n)?e.replace(n,"published: "+!!t):e+"\npublished: "+!!t},this.model.jekyll?(this.model.raw_metadata=this.metadataEditor.getValue(),e=this.$("#post_published").prop("checked"),this.model.raw_metadata=t(this.model.raw_metadata,e),this.metadataEditor.setValue(this.model.raw_metadata),e?$("#post").addClass("published"):$("#post").removeClass("published"),!0):!0},t.prototype.updateFilename=function(e,t){var n,r;return n=function(){return r.model.path=app.state.path,r.model.file=app.state.file,app.instance.header.render(),r.updateURL()},r=this,_.validPathname(e)?(app.state.path=this.model.path,app.state.file=_.extractFilename(e)[1],app.state.path=_.extractFilename(e)[0],this.model.persisted?v(app.state.user,app.state.repo,app.state.branch,_.filepath(this.model.path,this.model.file),e,_.bind(function(e){return e||n(),e?t("error"):t(null)},this)):(n(),t(null))):t("error")},t.prototype.serialize=function(){return b(this.model.content,this.model.jekyll?this.model.raw_metadata:null)},t.prototype.updateSaveState=function(e,t){return $(".button.save").html(e).removeClass("inactive error saving").addClass(t)},t.prototype.sendPatch=function(e,t,n,r){var i,s;return i=function(){return s.updateMetaData()?(s.model.content=s.prevContent,s.editor.setValue(s.prevContent),m(app.state.user,app.state.repo,app.state.branch,e,n,r,function(e){if(e){_.delay(function(){return s.$(".button.save").html("SUBMIT CHANGE"),s.$(".button.save").removeClass("error"),s.$(".button.save").addClass("inactive")},3e3),s.updateSaveState("! Try again in 30 seconds","error");return}return s.dirty=!1,s.model.persisted=!0,s.model.file=t,s.updateURL(),s.prevContent=n,s.updateSaveState("CHANGE SUBMITTED","inactive")})):s.updateSaveState("! Metadata","error")},s=this,s.updateSaveState("SUBMITTING CHANGE ...","inactive saving"),i(),!1},t.prototype.saveFile=function(e,t,n,r){var i,s;return i=function(){return s.updateMetaData()?y(app.state.user,app.state.repo,app.state.branch,e,n,r,function(e){if(e){_.delay(function(){return s._makeDirty()},3e3),s.updateSaveState("! Try again in 30 seconds","error");return}return s.dirty=!1,s.model.persisted=!0,s.model.file=t,s.updateURL(),s.prevContent=n,s.updateSaveState("SAVED","inactive")}):s.updateSaveState("! Metadata","error")},s=this,s.updateSaveState("SAVING ...","inactive saving"),e===_.filepath(this.model.path,this.model.file)?i():this.updateFilename(e,function(e){return e?s.updateSaveState("! Filename","error"):i()})},t.prototype.updateFile=function(){var e,t,n,r,i,s;return s=this,n=$("input.filepath").val(),t=_.extractFilename(n)[1],e=this.serialize(),r=this.$(".commit-message").val()||this.$(".commit-message").attr("placeholder"),i=this.model.writeable?this.saveFile:this.sendPatch,this.model.content=this.editor.getValue(),i.call(this,n,t,e,r)},t.prototype.keyMap=function(){var e;return e=this,{"Shift-Ctrl-Left":function(t){return e.left()},"Shift-Ctrl-Right":function(t){return e.right()},"Shift-Ctrl-M":function(t){return e._toggleMeta()},"Ctrl-S":function(t){return e.updateFile()}}},t.prototype.initEditor=function(){var e;return e=this,setTimeout(function(){return e.model.jekyll&&(e.metadataEditor=CodeMirror($("#raw_metadata")[0],{mode:"yaml",value:e.model.raw_metadata,theme:"prose-dark",lineWrapping:!0,lineNumbers:!0,extraKeys:e.keyMap(),onChange:_.bind(e._makeDirty,e)}),$("#post .metadata").hide()),e.editor=CodeMirror($("#code")[0],{mode:e.model.lang,value:e.model.content,lineWrapping:!0,lineNumbers:!0,extraKeys:e.keyMap(),matchBrackets:!0,theme:"prose-bright",onChange:_.bind(e._makeDirty,e)}),e.refreshCodeMirror()},100)},t.prototype.render=function(){var e;return e=this,$(this.el).html(app.templates.post(_.extend(this.model,{mode:this.mode}))),this.model.published&&$(this.el).addClass("published"),this.initEditor(),this},t}(Backbone.View),app.views.Posts=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.events={"click a.link":"_loading","keyup #search_str":"_search","click a.switch-branch":"_toggleBranchSelection"},t.prototype._toggleBranchSelection=function(){return this.$(".branch-wrapper .branches").toggle(),!1},t.prototype.initialize=function(e){},t.prototype._search=function(){return _.delay(_.bind(function(){var e;return e=this.$("#search_str").val(),this.model=o(this.model.tree,app.state.path,e),this.renderResults()},this),10)},t.prototype._loading=function(e){return $(e.currentTarget).addClass("loading")},t.prototype.semantifyPaths=function(e){return _.map(e,function(e){return{path:e,name:e}})},t.prototype.renderResults=function(){var e,t;return this.$("#files").html(app.templates.files(_.extend(this.model,app.state,{current_path:app.state.path}))),e=this.model.files.length+"",t=this.$("#search_str").val(),t?e+=" matches":e+=" files",this.$(".results").html(e)},t.prototype.render=function(){var e;return e=this,$(this.el).html(app.templates.posts(_.extend(this.model,app.state,{current_path:app.state.path}))),_.delay(function(){return e.renderResults(),$("#search_str").focus()},1),this},t}(Backbone.View),app.views.Profile=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.id="start",t.prototype.render=function(){return $(this.el).html(app.templates.profile(this.model)),this},t}(Backbone.View),app.views.Start=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return E(t,e),t.prototype.id="start",t.prototype.events={"submit #login_form":"_login"},t.prototype._login=function(){var e,t,n;return t=this,n=t.$("#github_user").val(),e=t.$("#github_password").val(),login({username:n,password:e},function(e){return e?t.$(".bad-credentials").show():window.location.reload()}),!1},t.prototype.render=function(){return $(this.el).html(app.templates.start(this.model)),window.authenticated||$("#header").hide(),this},t}(app.views.Profile),app.routers.Application=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return E(n,e),n.prototype.initialize=function(){return this.route(/(.*\/.*)/,"path",this.path),this.route(":user","user",this.profile),this.route(":user/:repo","repo",this.repo),this.route("","start",this.start)},n.prototype.start=function(){if(!t())return;return app.state={user:"",repo:"",mode:"",branch:"",path:""},app.config.rootUrl!=null?this.navigate(app.config.rootUrl,!0):app.instance.start()},n.prototype.extractURL=function(e){return e=e.split("/"),app.state={user:e[0],repo:e[1],mode:e[2],branch:e[3],path:(e.slice(4)||[]).join("/")},app.state},n.prototype.path=function(e){var t;return e=this.extractURL(e),e.mode==="tree"?app.instance.posts(e.user,e.repo,e.branch,e.path):e.mode==="new"?app.instance.newPost(e.user,e.repo,e.branch,e.path):(t=_.extractFilename(e.path),app.state.file=t[1],app.instance.post(e.user,e.repo,e.branch,t[0],t[1],e.mode))},n.prototype.repo=function(e,t){return app.state={user:e,repo:t,mode:"tree",branch:"",path:""},app.instance.posts(e,t)},n.prototype.profile=function(e){if(t())return app.state={user:e,repo:"",mode:"",branch:"",path:""},app.instance.profile(e)},n}(Backbone.Router),_.serial=function(){return _(arguments_).reduceRight(_.wrap,function(){})()},_.parentPath=function(e){return e.replace(/\/?[a-zA-Z0-9_-]*$/,"")},_.topPath=function(e){var t;return t=e.match(/\/?([a-zA-Z0-9_-]*)$/),t[1]},_.validFilename=function(e){return!!e.match(/^([a-zA-Z0-9_-]|\.)+$/)},_.validPathname=function(e){return _.all(e.split("/"),function(e){return _.validFilename(e)})},_.extractFilename=function(e){var t;return e.match(/\//)?(t=e.match(/(.*)\/(.*)$/),[t[1],t[2]]):["",e]},_.mode=function(e){var t;if(_.markdown(e))return"gfm";t=_.extension(e);switch(t){case"js":case"json":return"javascript";case"html":return"htmlmixed";case"rb":return"ruby";case"yml":return"yaml";case"clj":return"clojure";case"coffee":case"cake":return"coffeescript";case"java":case"c":case"cpp":case"cs":case"php":return"clike"}return t},_.jekyll=function(e,t){return!!e.match("_posts")&&!!_.markdown(t)},_.hasMetadata=function(e){return e.match(/^(---\n)((.|\n)*?)\n---\n?/)},_.extension=function(e){var t;return t=e.match(/\.(\w+)$/),t?t[1]:null},_.markdown=function(e){var t;return t=new RegExp(".(md|mkdn?|mdown|markdown)$"),!!t.test(e)},_.clip=function(e,t){var n;return n=e.substr(0,t),t<e.length&&(n+=" ..."),n},_.filepath=function(e,t){return(e?e+"/":"")+t},_.toYAML=function(e){var t;return t=[],_.each(e,function(e,n){var r;return e.match(/\n/)?(r=n+": |\n",_.each(e.split("\n"),function(e){return r+="  "+e}),t.push()):t.push(n+": "+e)}),t.join("\n")},_.fromYAML=function(e){var t,n,r,i,s,o;return t=function(){var e,t;return r[e]=_.isArray(t)?t.join("\n"):t,e=null,t=""},r={},s=e.split("\n"),i=null,o="",n=!1,_.each(s,function(e){var r;r=e.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/),r&&i&&t();if(!r)return _.isArray(o)||(o=[]),n?o.push(e.trim()):o.push(e.replace(/^\s\s/,""));i=r[1],o=r[2];if(o.match(/\|$/))return n=!0,o=""}),t(),r},_.chunkedPath=function(e){var t;return t=e.split("/"),_.map(t,function(e,n){var r,i;i=[],r=0;while(r<=n)i.push(t[r]),r++;return{url:i.join("/"),name:e}})},a=function(){return new Github({token:$.cookie("oauth-token"),username:$.cookie("username"),auth:"oauth"})},g=function(){var e,t,n,r,i;e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",i=8,n="",t=0;while(t<i)r=Math.floor(Math.random()*e.length),n+=e.substring(r,r+1),t++;return n},u=function(e,t){var n;return app.currentRepo.user===e&&app.currentRepo.repo===t?app.currentRepo.instance:(n={user:e,repo:t,instance:a().getRepo(e,t)},n.instance)},e=function(){var e;return $.cookie("oauth-token")?window.authenticated=!0:(e=window.location.href.match(/\?code=([a-z0-9]*)/),e?($.getJSON("{{site.gatekeeper_url}}/authenticate/"+e[1],function(t){var n;return $.cookie("oauth-token",t.token),window.authenticated=!0,n=new RegExp("\\?code="+e[1]),window.location.href=window.location.href.replace(n,"").replace("&state=","")}),!1):!0)},d=function(){return window.authenticated=!1,$.cookie("oauth-token",null)},f=function(e){return window.authenticated?$.ajax({type:"GET",url:"https://api.github.com/user",dataType:"json",contentType:"application/x-www-form-urlencoded",headers:{Authorization:"token "+$.cookie("oauth-token")},success:function(t){var n,r;return $.cookie("avatar",t.avatar_url),$.cookie("username",t.login),app.username=t.login,r=a().getUser(),n={},r.repos(function(t,i){return r.orgs(function(t,r){return _.each(i,function(e){return n[e.owner.login]=n[e.owner.login]?n[e.owner.login].concat([e]):[e]}),e(null,{available_repos:i,organizations:r,owners:n})})})},error:function(t){return e("error",{available_repos:[],owners:{}})}}):e(null,{available_repos:[],owners:{}})},p=function(e,t){var n;return n=a().getUser(),n.show(e,function(r,i){var s;return s={},i.type.toLowerCase()==="user"?n.userRepos(e,function(e,n){return t(null,{repos:n,user:i})}):n.orgRepos(e,function(e,n){return t(null,{repos:n,user:i})})})},l=function(e,t,n){return t=u(e,t),t.listBranches(function(e,t){return n(e,t)})},o=function(e,t,n){var r,i,s,o;return i=function(e){var r;return e.path===t?!1:(r=e.path.match(new RegExp("^"+t+"(.*)$")),r?!!n||r[1].split("/").length<=(t?2:1):!1)},s=function(e){return n?e.path.toLowerCase().search(n.toLowerCase())>=0:!0},o=0,r=_.filter(e,function(e){var r;return r=new RegExp("("+n+")","i"),e.name=n?e.path:_.extractFilename(e.path)[1],e.name=e.name.replace(new RegExp("^"+t+"/?"),""),e.name=e.name.replace(r,"<b>$1</b>"),i(e)?(o+=1,s(e)):!1}),r=_.sortBy(r,function(e){return(e.type==="tree"?"A":"B")+e.path}),{tree:e,files:r,total:o}},h=function(e,t,n,r,i){var s,a,f;return a=function(e){return f.read(n,"_config.yml",function(t,n){return t?e(t):e(null,jsyaml.load(n))})},s=function(s){return a(function(s,u){var a;return app.state.jekyll=!s,app.state.config=u,a=u&&u.prose&&u.prose.rooturl?u.prose.rooturl:"",r||(r=a),f.getTree(n+"?recursive=true",function(s,u){return s?i("Not found"):l(e,t,function(e,t){return e?i("Branches couldn't be fetched"):(app.state.path=r?r:"",app.state.branches=_.filter(t,function(e){return e!==n}),i(null,o(u,r,"")))})})})},f=u(e,t),f.show(function(e,t){return n||(app.state.branch=n=t.master_branch),app.state.permissions=t.permissions,s()})},b=function(e,t){return t?["---",t,"---"].join("\n")+"\n\n"+e:e},y=function(e,t,n,r,i,s,o){return t=u(e,t),t.write(n,r,i,s,o)},s=function(e,t,n,r){var i,s,o;return s=function(e){return _.delay(function(){return i.contents("",function(t,n){return n?e():s(e)})},500)},o=u(e,t),i=u(app.username,t),o.fork(function(e){return s(function(){return o.getRef("heads/"+n,function(e,t){return i.listBranches(function(e,n){var s,o;s=1;while($.inArray("prose-patch-"+s,n)!==-1)s++;return o={ref:"refs/heads/prose-patch-"+s,sha:t},i.createRef(o,r)})})})})},n=function(e,t,n,r){return t=u(e,t),t.createPullRequest(n,function(e){return r()})},m=function(e,t,r,i,o,u,a){return s(e,t,r,function(e,s){return r=s.ref.substring(s.ref.lastIndexOf("/")+1),y(app.username,t,r,i,o,u,function(e){var t;return e?a(e):(t={title:u,body:"This pull request has been automatically generated by Prose.io.",base:app.state.branch,head:app.username+":"+r},n(app.state.user,app.state.repo,t,a))})})},r=function(e,t,n,r,i,s){return t=u(e,t),t.remove(n,_.filepath(r,i),s)},v=function(e,t,n,r,i,s){return t=u(e,t),t.move(n,r,i,s)},i=function(e,t,n,r,i){var s,o,u;u="layout: default\npublished: false",o={layout:"default",published:!1},s=app.state.config;if(s&&s.prose&&s.prose.metadata&&s.prose.metadata[r]){u=s.prose.metadata[r];try{o=jsyaml.load(u)}catch(a){console.log("ERROR encoding YAML")}}return i(null,{metadata:o,raw_metadata:u,content:"# How does it work?\n\nEnter Text in Markdown format.",repo:t,path:r,published:!1,persisted:!1,writeable:!0,file:(new Date).format("Y-m-d")+"-your-filename.md"})},c=function(e,t,n,r,i,s){return t=u(e,t),t.read(n,r?r+"/"+i:i,function(e,n,o){var u,a,f;return f=function(e){return!!e.match(/published: true/)},u=function(e){var t,n;return n=function(){return!!app.state.permissions&&!!app.state.permissions.push},e=e.replace(/\r\n/g,"\n"),_.hasMetadata(e)?(t={raw_metadata:"",published:!1,writeable:n()},t.content=e.replace(/^(---\n)((.|\n)*?)\n---\n?/,function(e,n,r){return t.raw_metadata=r,t.published=f(r),""}).trim(),t):{raw_metadata:"",content:e,published:!1,writeable:n()}},e?s(e):(a=u(n),s(e,_.extend(a,{sha:o,markdown:_.markdown(i),jekyll:_.hasMetadata(n),repo:t,path:r,file:i,persisted:!0})))})},app.currentRepo={user:null,repo:null,instance:null};if(!e())return;f(function(e,t){return window.app.instance=(new app.views.Application({el:"#container",model:t})).render(),e?app.instance.notify("error","Error while loading data from Github. This might be a temporary issue. Please try again later."):(window.router=new app.routers.Application,Backbone.history.start())}),t=function(){return!window.app.instance.mainView||!window.app.instance.mainView.dirty?!0:confirm("You have unsaved changes. Are you sure you want to leave?")},window.onbeforeunload=t}).call(this);