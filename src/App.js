import { useEffect, useState } from "react";
import "./styles.css";
import { fetchData } from "./data";
import List from "./components/List";
import NewsList from "./news/components/NewsListScratch/NewsList";
import Tabs from "./components/Tabs";
import NewsListLib from "./news/components/NewsListExistingLib";
// export default function App() {
//   const [pagesData, setPagesData] = useState([]);

//   useEffect(() => {
//     fetchData().then((pageDataResponse) => {
//       setPagesData(pageDataResponse);
//     });
//   }, []);
//   console.log(pagesData);

//   return (
//     <div className="App">
//       {pagesData.map((page) => (
//         <List data={page} />
//       ))}
//     </div>
//   );
// }
const tabs = [
  {
    name: "From Scratch",
  },
  {
    name: "Existing Library",
  },
  {
    name: "Intersection Observer",
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState("From Scratch");
  const onClick = (name) => setCurrentTab(name);
  return (
    <div className="App">
      <Tabs tabs={tabs} onClick={onClick} />
      {currentTab === "From Scratch" && <NewsList />}
      {currentTab === "Existing Library" && <NewsListLib />}
    </div>
  );
}
