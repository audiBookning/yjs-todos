# Minimal YJs - React Todo boilerplate

Testing basic implementation and functionalities of YJs with a todo react app

## Notes

-   Based on [Minimal-React-Todo-boilerplate](https://github.com/audiBookning/Minimal-React-Todo-boilerplate) and keeping the same oversimplified/minimalist attitude

-   To test the Webrtc feature of Yjs change the roomName variable in App.jsx to a constant (instead of using UUID) and start 2 different instances of react with `npm start`. Then the changes in one browser window will be reflected in the other.

-   [codesandbox preview](https://codesandbox.io/s/minimal-yjs-react-todo-sample-iwtohz?file=/readme.md)

-   More code on another branch:
    -   I tried to implement the unsubscribing from the Yjs observer.
    -   Mainly, i tried to avoid the multiple useEffect calling in dev and their unfortunate effects, that create-react-app has put in as an effort to try to teach us, mortals, how to code in React.
    -   Try to avoid creating multiple WebrtcProvider because of the useEffect...
    -   I don't know if i really understood the React Team message (at least i didn't disable the strict mode) or even if this code follows a minimally acceptable pattern.
    -   What i can tell is that the code, although apparently working as intended, is definitivelly not to my taste. So i exiled it to a different branch called [little-more-complex](https://github.com/audiBookning/yjs-todos/tree/little-more-complex). Maybe it can help someone in someway.

# Create React App Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
