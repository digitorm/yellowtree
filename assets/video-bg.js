(async()=>{const{loadScript:e,loadStyle:t}=await import(window.theme.modules.utils);var a=await import(window.theme.modules.baseComponent);customElements.define("video-bg",class extends a.default{elements={player:"[data-player]"};playerInited=!1;async render(){this.on("stopVideoBg",()=>{this.player&&this.player.pause()}),this.on("playVideoBg",()=>{this.player&&this.player.play()})}async onIntersect(e){e&&(this.player?this.player.play():(this.setAttribute("loading",""),await this.initPlayer())),!e&&this.player&&this.player.pause()}async initPlayer(){t("https://cdn.plyr.io/3.6.8/plyr.css"),window.Plyr||await e(window.theme.scripts.Plyr),this.playerInited=!0,this.player=new window.Plyr(this.$player,{muted:!0,loop:{active:"VIDEO"===this.$player.tagName}}),this.player.on("ended",()=>{this.player.restart()}),this.player.on("ready",()=>{this.player.play(),this.player.decreaseVolume(100)}),this.player.on("playing",()=>{this.removeAttribute("loading")})}})})();