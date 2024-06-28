# personal-website
Repo for my personal website

Local dev:
1. Run `nodemon server.py` and open `localhost:3000`

Workflow for creating animation and images:
1. Use the main.blend file here: https://drive.google.com/drive/u/0/folders/1q6F1anSglUJoLQU2nKwbJzBLoxR99zWZ
2. Add any models (usually from OnShape) or images (usually generated from Gimp) to the model
3. Create animations
4. Render animations at low sample rates to make sure it looks good first
	a. To render at low sample rates, click on "Render Properties", and under "Sampling", change "Render" to
		something really low (like 1)
	b. When rendering, make sure to save the video as FFMPEG and MPEG-4
5. If animation looks good, render at high sample rate (I was using 300)
6. Save the render as it's appropriate file name
	a. I have the JS look for specific filenames to play for each animation. If you want to add another animation,
		you will have to add it to the image map in the HTML
	b. If you are using the image map, make sure the coords are correct. You can use https://www.image-map.net/ to get
		the right coords
7. Test on local webpage

Webpage specific requirements:
1. The webpage needs a home "first frame" image. This is the first frame that each animation shares. I just
	moved the animation to it's first frame and rendered it in blender
2. Each animation needs an associated "last frame" image (follow steps above). This prevents frame dropping when
	switching between animations. Just make sure to name it the same as the associated video file
3. Each animation needs an associated reversed animation. This is import to create instead of letting the webpage 
	play it in reverse because it causes too much lag if the webpage tries to do it
	a. To do this, just run `reverse_video.sh <name_of_video>.mp4` and it will create a reversed video from the
		specified video, and will name it `<name_of_video>_reversed.mp4`

