import React, { useState, useEffect, useContext } from "react";

/**
 * Initializing Context
 */
// export const LinkContext = React.createContext({
//   link: "",
//   param: undefined,
//   updateLink: (newLink) => {},
// });

/**
 * Creating provider with default state
 * - holds the state for the message used everywhere in the App
 * - takes children parameter because it needs to render the children of the context
 * - updateMessage can be used from any child of provider and will update the global state
 */
export default function BrowseProvider({ children }) {
  // const [state, setState] = useState({
  //   link: "/",
  //   param: undefined,
  // });
  // const { link, param } = state;
  // const updateLink = (linkDetails) => {
  //   setState({ ...state, ...linkDetails });
  // };
  // return (
  //   <LinkContext.Provider value={{ link, param, updateLink }}>
  //     {children}
  //   </LinkContext.Provider>
  // );
}

// /**
//  * Example component for updating the state
//  */
// const MessageUpdater = () => {
//   const [message, updateMessage] = useContext(BrowseContext);

//   return (
//     <div>
//       <p>message in message updater is.. {message}</p>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => updateMessage(e.target.value)}
//       />
//     </div>
//   );
// };

// /**
//  * Example of component that displays the message
//  * (all child components can use the message in the same way, without passing props)
//  */
// const App = () => {
//   const [message] = useContext(BrowseContext);

//   useEffect(() => {
//     console.log("effect on message tirggered");
//   }, [message]);

//   return (
//     <>
//       <p>Message in app is.. {message}</p>
//       <MessageUpdater />
//     </>
//   );
// };

// /**
//  * Wrapps the App with the provider that holds the global message state and update function
//  */
// const AppContext = () => {
//   return (
//     <BrowseProvider>
//       <App />
//     </BrowseProvider>
//   );
// };
