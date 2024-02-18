import { useState, useRef, useEffect, useCallback } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [commands, setCommands] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const [user, setuser] = useState({});

  useEffect(() => {
    executeCommand('welcome')
  }, [])
  

  useEffect(() => {
    async function fetchData() {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }

    fetchData();
  }, [commands]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  const handleCtrlLPress = useCallback((e) => {
    if (e.ctrlKey && e.key === "l") {
      setCommands([]);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleCtrlLPress(e);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCtrlLPress]);


  const executeCommand = async (command) => {
    let commandOutput;
    switch (command.toLowerCase().trim()) {
      case "help":
        commandOutput = [
          { type: "response", text: "Available Commands:" },
          { type: "response", text: "about - about Yash Bhardwaj" },
          { type: "response", text: "clear - clear the terminal" },
          {
            type: "response",
            text: "echo - print out anything",
          },
          {
            type: "response",
            text: "education - my education background",
          },
          {
            type: "response",
            text: "help - check available commands",
          },
          { type: "response", text: "email - send an email to me" },
          {
            type: "response",
            text: "projects - view projects that I've coded",
          },
          { type: "response", text: "socials - check out my social accounts" },
          { type: "response", text: "welcome - display hero section" },
          { type: "response", text: "whoami - about current user" },
          {
            type: "response",
            text: "get-location: Gets your current location",
          },
        ];
        break;

      case "welcome":
        commandOutput = [
          {
            type: "response",
            text: "Welcome to my terminal portfolio. (Version 1.0.0)",
          },
          {
            type: "response",
            text: "------------------",
          },
          {
            type: "response",
            text: "For a list of available commands, type `help`.",
          },
        ];
        break;
      case "about":
        commandOutput = [
          { type: "response", text: "Hi, my name is Yash Bhardwaj!" },
          {
            type: "response",
            text: "I'm a Android app developer based in New Delhi, India.",
          },
          {
            type: "response",
            text: "I am passionate about writing codes and \n developing android and applications to solve real-life challenges.",
          },
        ];
        break;
      case "education":
        commandOutput = [
          { type: "response", text: "Here is my education background!" },
          {
            type: "response",
            text: "B.tech in Information Technology ~ CGPA : 8.9",
          },
          {
            type: "response",
            text: "Guru Gobind Singh Indraprastha University | 2021 ~ 2025",
          },
        ];
        break;
      case "socials":
        commandOutput = [
          { type: "response", text: "Here are my social links!" },
          {
            type: "response",
            text: "1. Github - https://github.com/yashbhardwaj11/",
          },
          {
            type: "response",
            text: "2. Linkedin - https://linkedin.com/in/yash-bhardwaj-07",
          },
          {
            type: "response",
            text: "3. Instagram - https://instagram.com/yashbhardwaj.11",
          },
          {
            type: "response",
            text: "4. Twitter - https://twitter.com/yash82206",
          },
          { type: "response", text: "\n Usage: socials go <social-no> " },
          { type: "response", text: "eg: socials go 1" },
        ];
        break;
      case "projects":
        commandOutput = [
          {
            type: "response",
            text: "“Talk is cheap. Show me the code”? I got you. ",
          },
          {
            type: "response",
            text: "Here are some of my projects you shouldn't misss",
          },
          {
            type: "response",
            text: "1. Eventia - https://play.google.com/store/apps/details?id=com.devinfusion.eventiafinal",
          },
          {
            type: "response",
            text: "2. StatusHive - https://play.google.com/store/apps/details?id=com.devinfusion.statushive",
          },
          {
            type: "response",
            text: "3. Niceter Dating app - https://github.com/yashbhardwaj11/Niecter",
          },
          {
            type: "response",
            text: "4. Netflix clone - https://github.com/yashbhardwaj11/NetflixClone",
          },
          {
            type: "response",
            text: "5. Mini Docs - https://minidocsyash.netlify.app/",
          },
          {
            type: "response",
            text: "6. Github Cards - https://githubcardsyash.netlify.app",
          },
          { type: "response", text: "\n Usage: projects go <project-no> " },
          { type: "response", text: "eg: projects go 1" },
        ];
        break;
      case "get-location":
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              commandOutput = [
                {
                  type: "response",
                  text: `Your current location is: Latitude ${latitude}, Longitude ${longitude}`,
                },
              ];
              setCommands([...commands, { command, output: commandOutput }]);
              setInput("");
            },
            (error) => {
              commandOutput = [
                {
                  type: "response",
                  text: `Error getting location: ${error.message}`,
                },
              ];
              setCommands([...commands, { command, output: commandOutput }]);
              setInput("");
            }
          );
        } else {
          commandOutput = [
            {
              type: "response",
              text: "Geolocation is not supported by this browser.",
            },
          ];
          setCommands([...commands, { command, output: commandOutput }]);
          setInput("");
        }
        break;

      case "email":
        commandOutput = [
          { type: "response", text: "yashbhardwaj.dev@gmail.com" },
        ];
        window.open("mailto:yashbhardwaj.dev@gmail.com", "_blank");
        break;
      case "whoami":
        commandOutput = [{ type: "response", text: "Visitor" }];
        break;

      default:
        if (command.toLowerCase().startsWith("echo ")) {
          const echoText = command.slice(5).trim();
          commandOutput = [{ type: "response", text: echoText }];
        } else if (command.toLowerCase().startsWith("socials go ")) {
          const id = command.slice(11).trim();
          if (id === "1") {
            window.open("https://github.com/yashbhardwaj11/", "_blank");
          } else if (id === "2") {
            window.open("https://github.com/yashbhardwaj11/", "_blank");
          } else if (id === "3") {
            window.open("https://instagram.com/yashbhardwaj.11", "_blank");
          } else if (id === "4") {
            window.open("https://twitter.com/yash82206", "_blank");
          } else {
            commandOutput = [
              { type: "response", text: "Invalid social number!" },
            ];
          }
        } else if (command.toLowerCase().startsWith("projects go ")) {
          const projectNo = command.slice(12).trim();
          switch (projectNo) {
            case "1":
              window.open(
                "https://play.google.com/store/apps/details?id=com.devinfusion.eventiafinal",
                "_blank"
              );
              break;
            case "2":
              window.open(
                "https://play.google.com/store/apps/details?id=com.devinfusion.statushive",
                "_blank"
              );
              break;
            case "3":
              window.open(
                "https://github.com/yashbhardwaj11/Niecter",
                "_blank"
              );
              break;
            case "4":
              window.open(
                "https://github.com/yashbhardwaj11/NetflixClone",
                "_blank"
              );
              break;
            case "5":
              window.open(
                "https://minidocsyash.netlify.app/",
                "_blank"
              );
              break;
            case "6":
              window.open(
                "https://githubcardsyash.netlify.app",
                "_blank"
              );
              break;
            default:
              commandOutput = [
                { type: "response", text: "Invalid project number!" },
              ];
          }
        } else {
          commandOutput = [{ type: "response", text: "not found!" }];
        }
        break;
    }

    if (command.toLowerCase() === "clear" || command.toLowerCase() === "cls") {
      setCommands([]);
    } else {
      setCommands([...commands, { command, output: commandOutput }]);
    }
    setInput("");
  };

  const handleTerminalClick = () => {
    inputRef.current.focus();
  };

  return (
    <div
      className="flex flex-col h-screen p-4 text-base md:text-lg bg-aubergine-custom font-mono"
      onClick={handleTerminalClick}
    >
      <div className="flex-1 overflow-y-auto  " ref={terminalRef}>
        {commands.map((cmd, index) => (
          <div key={index} className="response mb-1 md:mb-2">
            <div className="flex items-center">
              <span className="text-green-500">
                {user.name || "visitor@yashbhardwaj.dev"} {" :~$ "}
              </span>
              <span
                className={`ml-2 ${
                  cmd.output && cmd.output[0].type === "response"
                    ? "text-white "
                    : "text-red-500"
                } text-sm md:text-lg`}
              >
                {cmd.command}
              </span>
            </div>
            {cmd.output &&
              cmd.output.map((item, innerIndex) => (
                <div
                  key={innerIndex}
                  className={`output-${item.type} text-white text-sm md:text-lg`}
                >
                  <div className="flex items-center">
                    <span className="ml-2">{item.text}</span>
                  </div>
                </div>
              ))}
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-500 text-base md:text-lg">
            {user.name || "visitor@yashbhardwaj.dev"} {" :~$ "}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
            className="bg-transparent border-none text-white p-2 outline-none flex-1 focus:outline-none text-sm md:text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
