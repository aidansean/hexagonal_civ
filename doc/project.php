<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/hexagonal_civ" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=hexagonal_civ" ;
$project = new project_object("hexagonal_civ", "Hexagonal civilisation game", "https://github.com/aidansean/hexagonal_civ", "http://aidansean.com/projects/?tag=hexagonal_civ", "hexagonal_civ/images/project.jpg", "hexagonal_civ/images/project_bw.jpg", "Ever since I played Sid Meier's original <a href=\"http://en.wikipedia.org/wiki/Civilization_(video_game)\">Civilisation</a> I've wanted to make something similar to explore the gameplay and create something fun to pass the time.", "Games", "canvas,HTML,JavaScript") ;
?>