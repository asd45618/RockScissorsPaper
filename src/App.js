import { useEffect, useState } from "react";
import "./App.css";
import Box from "./component/Box";
import rock from "./img/rock.png";
import scissors from "./img/scissors.png";
import paper from "./img/paper.png";

//1. box 2개(타이틀, 사진, 결과)
//2. 가위 바위 보 버튼
//3. 버튼 클릭 시 클릭한 값이 box에 보임
//4. 컴퓨터는 랜덤한 아이템 선택
//5. 3,4를 가지고 누가 이겼는지 결과를 보여줌
//6. 승패 결과에 따라 테두리 색 변화(이기면-초록색, 지면-빨간색, 비기면-검은색)
//7. 결과 보여줌

const choice = {
  rock: {
    name: "Rock",
    img: rock,
  },
  scissors: {
    name: "Scissors",
    img: scissors,
  },
  paper: {
    name: "Paper",
    img: paper,
  },
};

function App() {
  const [userSelect, setUserSelect] = useState("");
  const [computerSelect, setComputerSelect] = useState("");
  const [result, setResult] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [tieCount, setTieCount] = useState(0);
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
    setTotalCount(totalCount + 1);
  };

  useEffect(() => {
    setWinCount(result === "Win" ? winCount + 1 : winCount);
    setLoseCount(result === "Lose" ? loseCount + 1 : loseCount);
    setTieCount(result === "Tie" ? tieCount + 1 : tieCount);
  }, [totalCount]);

  const judgement = (user, computer) => {
    // 유저가 '가위'를 선택했을 때
    //   1. 컴퓨터가 '가위'일 때 Tie
    //   2. 컴퓨터가 '바위'일 때 Lose
    //   3. 컴퓨터가 '보'일 때   Win
    // 유저가 '바위'를 선택했을 때
    //   1. 컴퓨터가 '가위'일 때 Win
    //   2. 컴퓨터가 '바위'일 때 Tie
    //   3. 컴퓨터가 '보'일 때   Lose
    // 유저가 '보'를 선택했을 때
    //   1. 컴퓨터가 '가위'일 때 Lose
    //   2. 컴퓨터가 '바위'일 때 Win
    //   3. 컴퓨터가 '보'일 때   Tie

    if (user.name === computer.name) {
      return "Tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "Win" : "Lose";
    else if (user.name === "Scissors")
      return computer.name === "Rock" ? "Lose" : "Win";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "Win" : "Lose";
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box
          title="Computer"
          item={computerSelect}
          result={result === "Win" ? "Lose" : result === "Lose" ? "Win" : "Tie"}
        />
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
      <div className="count">
        <div>총 횟수: {totalCount}</div>
        <div>이긴 횟수: {winCount}</div>
        <div>진 횟수: {loseCount}</div>
        <div>무승부 횟수: {tieCount}</div>
      </div>
    </div>
  );
}

export default App;
