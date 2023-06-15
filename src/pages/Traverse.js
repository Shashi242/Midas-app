import React, { useState } from 'react';
import "../Styles/Traverse.css";

export const Traverse = () => {
    // const [type,setType] = useState("");

    const [formData, setFormData] = useState({
        type: 'type1',
        plate_size: '1.00584',
        b1: '1.00584',
        b2: '1.88976',
        b3: '0.4572',
        b4: '2.01168',
        b5: '15.24',
        b6: '2.01168',
        b7: '0.4572',
        D: '6.096',
        n: '3',
        spring_type: 'General',
        lower: '19635.9',
        lateral: '19635.9',
        upper: '19635.9',
        elastic_length: '1.00584',
        length_unit: 'M,mm,in'
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const jsonData = JSON.stringify(formData);
    
        // Create a Blob from the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
    
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
    
        // Set the file name
        const fileName = 'Traverse.json';
        link.download = fileName;
    
        // Simulate clicking the link to trigger the file download
        link.click();
    
        // Clean up by revoking the URL object
        URL.revokeObjectURL(url);

        alert("Saved and Download Started")
      };

      const [files, setFiles] = useState("");

      const handleFileChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          console.log("e.target.result", e.target.result);
             setFiles(JSON.parse(e.target.result));
            //  const data = JSON.parse(e.target.result)


            //  if(data.bridge_type === "Normal type frame"){
            //     setCulvertType(false);
            //     setNormalType(true);
            //  }
            //  else if(data.bridge_type === "Box Culvert"){
            //     setNormalType(false);
            //     setCulvertType(true);
            //  }
        //   setFiles(e.target.result);
        };
      };

    const unit = files ? files.length_unit === 'M,mm,in' ? 'm' : files.length_unit : formData.length_unit === 'M,mm,in' ? 'm' : formData.length_unit;

    return (
        <div className='traverse_parent'>
            <div className='traverse_div'>
                {/* <div className='diagram'></div> */}
                <div className='type_div'>
                    <div className='selectdiv'>
                        <span className='type'>Type</span>
                        <select value={files?files.type:formData.type} name='type' onChange={handleChange}>
                            <option value="type1">Type1</option>
                            <option value="type2">Type2</option>
                        </select>
                    </div>
                    <div className='plate_size_div'>
                        <span className='plate_size'>Size of Plate Element</span>
                        <input name='plate_size' value={files?unit==='mm'?files.plate_size*1000:unit==='in'?files.plate_size*39.3701:files.plate_size:
                    unit==='mm'?formData.plate_size*1000:unit==='in'?formData.plate_size*39.3701:formData.plate_size} onChange={handleChange} /> {unit}
                    </div>
                </div>
                <div className='unit_main'>
                    <div className='rows'>
                        <div className='unit_inp'>
                            <span>b1</span>
                            <input name='b1' value={files?unit==='mm'?files.b1*1000:unit==='in'?files.b1*39.3701:files.b1:
                    unit==='mm'?formData.b1*1000:unit==='in'?formData.b1*39.3701:formData.b1} disabled /> {unit}
                        </div>
                        <div className='unit_inp'>
                            <span>b2</span>
                            <input name='b2' value={files?unit==='mm'?files.b2*1000:unit==='in'?files.b2*39.3701:files.b2:
                    unit==='mm'?formData.b2*1000:unit==='in'?formData.b2*39.3701:formData.b2} disabled/> {unit}
                        </div>
                        <div className='unit_inp'>
                            <span>b3</span>
                            <input name='b3' value={files?unit==='mm'?files.b3*1000:unit==='in'?files.b3*39.3701:files.b3:
                    unit==='mm'?formData.b3*1000:unit==='in'?formData.b3*39.3701:formData.b3} onChange={handleChange} /> {unit}
                        </div>
                        <div className='unit_inp'>
                            <span>b4</span>
                            <input name='b4' value={files?unit==='mm'?files.b4*1000:unit==='in'?files.b4*39.3701:files.b4:
                    unit==='mm'?formData.b4*1000:unit==='in'?formData.b4*39.3701:formData.b4} onChange={handleChange} /> {unit}
                        </div>
                    </div>
                    <div className='rows'>
                        <div className='unit_inp'>
                            <span>b5</span>
                            <input name='b5' value={files?unit==='mm'?files.b5*1000:unit==='in'?files.b5*39.3701:files.b5:
                    unit==='mm'?formData.b5*1000:unit==='in'?formData.b5*39.3701:formData.b5} onChange={handleChange} /> {unit}
                        </div>
                        <div className='unit_inp'>
                            <span>b6</span>
                            <input name='b6' value={files?unit==='mm'?files.b6*1000:unit==='in'?files.b6*39.3701:files.b6:
                    unit==='mm'?formData.b6*1000:unit==='in'?formData.b6*39.3701:formData.b6} onChange={handleChange} disabled={files?files.type==="type2"?true:false:formData.type==="type2"?true:false} /> {unit}
                        </div>
                        <div className='unit_inp'>
                            <span>b7</span>
                            <input name='b7' value={files?unit==='mm'?files.b7*1000:unit==='in'?files.b7*39.3701:files.b7:
                    unit==='mm'?formData.b7*1000:unit==='in'?formData.b7*39.3701:formData.b7} onChange={handleChange}/> {unit}
                        </div>
                        <div className='unit_inp'>
                            <span>D</span>
                            <input name='D' value={files?unit==='mm'?files.D*1000:unit==='in'?files.D*39.3701:files.D:
                    unit==='mm'?formData.D*1000:unit==='in'?formData.D*39.3701:formData.D} disabled/> {unit}
                        </div>
                    </div>
                    <div className='rows'>
                        <div className='unit_inp'>
                            <span>n</span>
                            <input name='n' value={files?unit==='mm'?files.n*1000:unit==='in'?files.n*39.3701:files.n:
                    unit==='mm'?formData.n*1000:unit==='in'?formData.n*39.3701:formData.n} disabled/> {unit}
                        </div>
                    </div>
                </div>
                <div className='supports_div'>
                    <span className='head'>Supports of Pi Frame</span>
                    <div className='support_child'>
                        <span className='span1'>Traverse Fixed Support</span>
                        <select disabled></select>
                        <span className='span2'>from left side</span>
                    </div>
                </div>
                <div className='culvert_supports'>
                    <span className='outer_span'>Supports of Culvert</span>
                    <div className='spring_type'>
                        <span>Spring Type</span>
                        <input name='spring_type' value="General" type='radio' checked onChange={handleChange}/>General
                        <input name='spring_type' value="Compression Only" type='radio' disabled />Compression Only
                    </div>
                    <div className='modulus_main'>
                        <span className='text'>Modulus of Subgrade Reaction</span>
                        <div className='values'>
                            <div className='values_inp'>
                                <span>Lower :</span>
                                <input name='lower' value={files?files.lower:formData.lower} onChange={handleChange} />kN/m3
                            </div>
                            <div className='values_inp'>
                                <span>Lateral :</span>
                                <input name='lateral' value={files?files.lateral:formData.lateral} disabled />kN/m3
                            </div>
                            <div className='values_inp'>
                                <span>Upper :</span>
                                <input name='upper' value={files?files.upper:formData.upper} disabled />kN/m3
                            </div>
                        </div>
                    </div>
                    <div className='elastic_length'>
                        <span>Length of Elastic Link</span>
                        <input name='elastic_length' value={files?unit==='mm'?files.elastic_length*1000:unit==='in'?files.elastic_length*39.3701:files.elastic_length:
                    unit==='mm'?formData.elastic_length*1000:unit==='in'?formData.elastic_length*39.3701:formData.elastic_length} onChange={handleChange}/> {unit}
                    </div>
                </div>
                <div className='length_unit'>
                    <span>Length-Unit</span>
                    <select name='length_unit' value={files?files.length_unit:formData.length_unit} onChange={handleChange}>
                        <option disabled selected>M,mm,in</option>
                        <option>m</option>
                        <option>mm</option>
                        <option>in</option>
                    </select>
                </div>
            </div>
            <div className='import_div'>
            <span className='inp1' type='text' style={{ color: "white", fontSize: "14px", cursor: "pointer" }} onClick={()=>{alert("Please Click on Choose File")}} value="Import" >Import</span>
                <input className='inp2' type='file' onChange={handleFileChange}/>
                <button type='submit' onClick={handleSubmit} style={{cursor: "pointer"}}>Save</button>
            </div>
        </div>
    )
}
