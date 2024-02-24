import { useState } from "react";
import data from "./data";
import './style.css';

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enablemulti, setEnableMulti] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(selected === getCurrentId ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexofCurrentId = copyMultiple.indexOf(getCurrentId);
    if (findIndexofCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(findIndexofCurrentId, 1); // Corrected this line
    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMulti(!enablemulti)}>
        Enable multiselection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataitem) => (
            <div className="item" key={dataitem.id}>
              <div className="title" onClick={() => enablemulti ? handleMultiSelection(dataitem.id) : handleSingleSelection(dataitem.id)}>
                <h3>{dataitem.question}</h3>
                <span>+</span>
              </div>
              {enablemulti ? multiple.indexOf(dataitem.id) !== -1 && (
                <div className="content">{dataitem.answer}</div>
              ) : selected === dataitem.id ? <div className="content">{dataitem.answer}</div> : null}

            </div>
          ))
        ) : (
          <div>no data found</div>
        )}
      </div>
    </div>
  );
}
