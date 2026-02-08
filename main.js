import { createApp, reactive, toRefs } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let reactiveTeams = reactive({
    teams: Array()
})

const vueCtx = createApp({
    onload() {

    },
    data() {
        return {
            navWidth: 0,
            papaParseRes: Array(),
            ...toRefs(reactiveTeams),
            search: "",
        }
    },
    methods: {
        openNav() {
            document.getElementById("sidebarColumn").style.display = "none";
            this.navWidth = document.body.clientWidth;
        },
        closeNav() {
            document.getElementById("sidebarColumn").style.display = "none";
            this.navWidth = 0;
        },

        fileChange(event) {
            const file = event.target.files[0];
            if (!file) {
                console.log("No file selected!");
                return;
            }
            let res = [];
            this.teams.splice(0, this.teams.length, res);
            Papa.parse(file, {complete: function(results, file) {
                results;
                console.log("parsed!")
                afterQuery(results);
            }});
        },
    },
    // computed: {
    //     // searchedTeams() {
    //     //     if (this.search == "") {
    //     //         return this.teams;
    //     //     }
    //     //     else {
    //     //         return this.teams.filter((team) => String(team).startsWith(this.search));
    //     //     }
    //     // }
    // },
    asyncComputed: {
        searchedTeams: {
            async get() {
                this.teams;
                console.log("ran");
                console.log(this.teams);
                console.log(this.search)
                if (this.search == "") {
                    return this.teams;
                }
                else {
                    return this.teams.filter((team) => String(team).startsWith(this.search));
                }
            }
        }
    }
    
}).use(AsyncComputed);
vueCtx.mount("#main");

async function fetchTeams(teamsListReact) {
    let response = await fetch("requests/getTeams.php");
    if (response.ok) {
        let jsonContent = "";
        for await (const chunk of response.body) {
            jsonContent += Array.from(chunk, (c) => String.fromCharCode(c)).join('');
        }
        teamsListReact.teams = JSON.parse(jsonContent);
    }
}
fetchTeams(reactiveTeams);

// init YT iframe api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
        'playsinline': 1
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        videoPlaying = true;
    }
    else {
        videoPlaying = false;
    }
}

setInterval(getVideoTime, 10);
var videoPlaying = false;
function getVideoTime() {
    if (videoPlaying == true) {
        console.log("ran!");
        
        document.getElementById("time").innerText = "Video Time: " + (player.getCurrentTime()/player.getDuration())*100 + "%";
    }
}

function afterQuery(results) {
    rbql.query_context = [];
    console.log("wtf dude");
    let warnings = [];
    let res = []
    let tableHeaders = results["data"].splice(0, 1)[0]; //assuming first row is headers

    rbql.query_table('select a.Index limit 8832', results["data"], res, warnings, null, tableHeaders).then(() => {
        vueCtx.teams = res;
    });
}


// hide sidebar teams on transition to improve performance significantly
document.getElementById("sidebarDiv").addEventListener("transitionend", () => {
    document.getElementById("sidebarColumn").style.display = "";
});