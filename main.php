<?php
    session_start();

    if ($_SESSION["auth"] !== true){
        echo "<!DOCTYPE html><html><body>not authenticated\n<button><a href=\"/\">Go Back</a></button></body></html>";
        die();
    }
?>

<!DOCTYPE html>
<html>
    <header>
        <link rel="stylesheet" href="style.css">
    </header>
    
    <body>

        <div id="main">
            <div class="sidebar" id="sidebarDiv" :style="{width: navWidth + 'px'}">
                
                <div id="searchAndClose">
                    <span style="cursor: pointer; float:right" id="sidebarCloseBtn" @click="closeNav">&times;</span>
                    <span id="sidebarSearch"><input v-model="search"></span>
                    <span>{{searchedTeams == null ? 0 : searchedTeams.length}}</span>
                </div>

                <div id="sidebarColumn" style="display:none">
                    <a v-for="team in searchedTeams" :href="'test.html?' + team">{{team}}</a>
                </div>
            </div>

            <div>
                <span id="sidebarNav" @click="openNav">&#9776;</span>
            </div>

            <div id="video">
    
            </div>
            <p id="time"></p>
        </div>

        <script src="papaparse.js"></script>
        <script src="rbql.js"></script>
        <script src="vue-async-computed401.js"></script>
        <script type="module" src="main.js"></script>
    </body>
</html>