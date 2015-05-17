from project_module import project_object, image_object, link_object, challenge_object

p = project_object('hexagonal_civ', 'Hexagonal civilisation game')
p.domain = 'http://www.aidansean.com/'
p.path = 'hexagonal_civ'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.folder_name = 'aidansean'
p.github_repo_name = 'hexagonal_civ'
p.mathjax = False
p.links.append(link_object(p.domain, 'guess_the_song/', 'Live page'))
p.introduction = 'Ever since I played Sid Meier\'s original <a href="http://en.wikipedia.org/wiki/Civilization_(video_game)">Civilisation</a> I\'ve wanted to make something similar to explore the gameplay and create something fun to pass the time.'
p.overview = '''In principle this game should be fairly easy to develop because it is turn based and each problem (except the AI) is well defined.  I first tried developing a game using SVG and one of my friends suggested using hexagons, which gives it a nicer, more rounded feel.  However like many other projects this one is much lower priority than the others and it's hard to justify the large amount of time required for development, so it's stayed in a very rudimentary state for a long time.

As usual this game uses the canvas with the normal model for user interaction that I developed when writing the <a href="http://aidansean.com/projects/?p=160">Feynman diagram maker</a>.  The rest is simply a matter of keeping track of the variables needed for the game to function.  The interface would be as clean and elegant possible, as I felt this was the main advantage the original game had over the rest of the series.'''

p.challenges.append(challenge_object('This was one of the first games I developed using hexagons.', 'The choice to use hexagons leads to some non trivial problems.  The most important challenge is the choice of coordinate systems and arranging it in an intuitive manner.  It tooks some trial and errr but in the end I created a map that could be used for the development of the game.', 'Resolved'))

p.challenges.append(challenge_object('This game would need some (basic) artificial intelligence.', 'This is something I haven\'t even started to think about yet!', 'To do'))
