# crikchat
hackathon cricket bot to learn rules of cricket
“Cognitive Document Search”

Document search was mostly keyword search, until the cognitive capabilities of Artificial Intelligence were realized. Imagine a scenario where you are able to chat with documents, find relevant snippets from thousands of documents just like humans do.

As part of the challenge you should develop a cognitive document search app that is able to

Allow users to converse in natural language to find relevant documents.

Understand key concepts of a particular domain.

Show confidence score of the retrieved documents.

The rules of the game of Cricket are complex. It sometimes becomes difficult to search for a given rule of Cricket. As part of the assignment you should be able to develop a chatbot that answers various questions regarding the rules of Cricket.

## Usage
### Requirements to set up OS environment
* Download and install [GITBash](https://git-scm.com/downloads) 
* Check the path of git in your environment variables.
* Download and install [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* Check the path of node in your environment variables.
* Open any terminal window (Preferably Git Bash) and type `node -v` and `npm -v` to verify the install.
* Download and install Packages :[ gulp, bower, ionic, cordova ] globally on the system type :`sudo npm install gulp bower ionic cordova -g`. || For Win (`npm install gulp bower ionic cordova -g`)

###Running Application
* Run the following command on terminal to download local package dependencies : `sudo npm install && bower install`. || For Win (`npm install && bower install`)
* Run `ionic serve` to start [web server](http://localhost:8100/)

### Development
Continue developing the application further by editing the `www` directory. With the `ionic serve` command, any file changes made will automatically be compiled and run on [livereload server](http://localhost:35729).

## Credits
* [Prashant Singh](pacificlion123@gmail.com)

####NOTE: 
* YOU MIGHT NEED TO INSTALL CONCAT-MAP AND BALANCED-MATCH PLUGINS ADDITIONALLY IN YOUR NODE MODULES IF YOU DO NOT FIND THEM IN YOUR `package.json` :
1: `sudo npm install concat-map --save` || For Win (`npm install concat-map --save`)
2: `sudo npm install balanced-match --save` || For Win (`npm install concat-map --save`)
3.  To build apk for android , you should install android studio and install dependencies for API 23 at least and run command from terminal `ionic build android`

* Working on Linux or Mac is more preferable.
