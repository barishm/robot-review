import { useState,useEffect } from "react";

const Compare = () => {
    const [Ids , setIds] = useState([]);
    const [Model,setModel] = useState(null)
    const [IdAndModel , setIdAndModel] = useState([]);
    const [Robots,setRobots] = useState([]);

    
    useEffect(() => {
        const fetchIdAndModel = async () => {
            try {
                const response = await fetch('http://localhost:8000/');
                const jsonData = await response.json();
                setIdAndModel(jsonData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchIdAndModel();
    }, []);

    const fetchRobotsByIds = async () => {
        try {
            const idsQuery = Ids.map(id => `ids=${id}`).join('&');
            const url = `http://localhost:8000/robots?${idsQuery}`;
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log(jsonData);
            setRobots(jsonData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    




    function handleAdd() {
    const foundItem = IdAndModel.find(item => item.model === Model);
        if (foundItem && !Ids.includes(foundItem.id)) {
            setIds([...Ids, foundItem.id]);
        }
    }
    useEffect(() => {
        if (Ids.length > 0) {
          fetchRobotsByIds();
        }
      }, [Ids]);
    let tbl = null;  
    if (Robots.length > 0) {
        tbl = <div className="compare-container">
              {Robots.map((item) => (
              <div key={item.id}>
                  <div className="compare-fields">{item.model}</div>
                  <div className="compare-fields">{item.mapping}</div>
                  <div className="compare-fields">{item.mappingSensorType}</div>
                  <div className="compare-fields">{item.highPrecisionMap}</div>
                  <div className="compare-fields">{item.frontCamera}</div>
                  <div className="compare-fields">{item.rechargeResume}</div>
                  <div className="compare-fields">{item.autoDockAndRecharge}</div>
                  <div className="compare-fields">{item.noiseLevel}</div>
                  <div className="compare-fields">{item.display}</div>
                  <div className="compare-fields">{item.sideBrushes}</div>
                  <div className="compare-fields">{item.voicePrompts}</div>
                  <div className="compare-fields">{item.CleaningFeatures.suctionPower}</div>
                  
              </div>
              ))}
              </div>
        
      }  

    
    
    

    return (
        <div>
            <div style={{ display: "flex" }}>
                <input className="form-control choose-robot" list="datalistOptions" id="exampleDataList" placeholder="Choose robot from the list" onChange={(e)=>setModel(e.target.value)}/>
                <button type="button" className="btn btn-secondary add-button" onClick={handleAdd}>Add</button>
            </div>
            <datalist id="datalistOptions">
            {IdAndModel.map((item) => (
                    <option key={item.id} value={item.model} />
                ))}
            </datalist>
            {tbl}
        </div>
    );
}
export default Compare;