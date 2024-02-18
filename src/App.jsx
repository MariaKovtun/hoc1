import {useState} from 'react';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const DateTimePretty = withDateTimePretty(DateTime, compareDateToNow);

function compareDateToNow(date) {
  let diff = Date.now() - Date.parse(date);
  
  if (diff == 0) return "сейчас";
  else {
    let min = diff/60000;
    let hour = min/60;
    let day = hour/24;

    if (day > 1) return `${Math.trunc(day)} д. назад`;
    else return `${Math.trunc(min)} мин. назад`;
  }
}

function withDateTimePretty(Component, propsAction) {
  return function(props) {
  return Component.apply(this, [{date: propsAction(props.date)}]);
  }
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map((item,index) => <Video key={index} url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-02-18 20:00:00'
        },
        {
          url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2024-02-16 20:00:00'
      },
      {
        url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2024-02-17 00:00:00'
    },
    {
        url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-01-03 12:10:00'
    },
    {
        url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2018-01-01 16:17:00'
    },
    {
        url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2017-12-02 05:24:00'
    },
    ]);

    return (
        <VideoList list={list} />
    );
}