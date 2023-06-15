import React, { useState } from 'react';
import "../Styles/Longitudinal.css";

export const Longitudinal = () => {
    const [normaltype, setNormalType] = useState(true);
    const [culverttype, setCulvertType] = useState(false);

    const [formData, setFormData] = useState({
        bridge_type: '',
        material: '1',
        plate_size: '0.9144',
        span: '12.8016',
        thickness: '0.4572',
        skew_angle: '20',
        length_unit: 'M,mm,in',
        t1: '0.70104',
        t2: '0.70104',
        t3: '0.70104',
        t4: '0.762',
        a1: '0.3048',
        a2: '0.3048',
        a3: '0.6096',
        a4: '0.54864',
        b1: '0.9144',
        b2: '0.9144',
        b3: '1.524',
        b4: '8.01624',
        b5: '0.3048',
        b6: '0.03048',
        h1: '8.01624',
        h2: '0.09144',
        h3: '1.524',
        A: '60',
        C: '0.4572',
        p: '0.09144',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log(formData);

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
        const fileName = 'Longitudinal.json';
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
            const data = JSON.parse(e.target.result)
            if (data.bridge_type === "Normal type frame") {
                setCulvertType(false);
                setNormalType(true);
            }
            else if (data.bridge_type === "Box Culvert") {
                setNormalType(false);
                setCulvertType(true);
            }
            //   setFiles(e.target.result);
        };
    };

    const unit = files ? files.length_unit === 'M,mm,in' ? 'm' : files.length_unit : formData.length_unit === 'M,mm,in' ? 'm' : formData.length_unit;

    return (
        <div className='longitudinal_main'>
            {/* <div className='diagram_div'></div> */}
            <div className='structure_type'>
                <input value="Structure Type" disabled className='structure_type_text' />
                <div className='dimensional'>
                    <input type='radio' className='radio_inp' disabled />
                    <span className='dimensional_text'>2-Dimensional</span>
                </div>
                <div className='dimensional'>
                    <input type='radio' className='radio_inp' checked />
                    <span className='dimensional_text'>3-Dimensional</span>
                </div>
            </div>
            <div className='bridge_type_div'>
                <span className='bridge_type'>Type of Bridge</span>
                <div className='bridge_type_main'>
                    <div className='bridge_type_inp'>
                        <input type='radio' name='bridge_type' value="Normal type frame" onChange={handleChange} onClick={() => { setNormalType(true); setCulvertType(false) }} checked={normaltype} />
                        <span>Normal Type Frame</span>
                    </div>
                    <div className='bridge_type_inp'>
                        <input type='radio' name='bridge_type' value="Box Culvert" onChange={handleChange} onClick={() => { setNormalType(false); setCulvertType(true) }} checked={culverttype} />
                        <span>Box Culvert</span>
                    </div>
                </div>
            </div>
            <div className='material_div_main'>
                <div className='material_div'>
                    <input type='text' value="Material" style={{ width: "80px", height: "17px", textAlign: "center", fontSize: "12px" }} disabled />
                    <input type='text' name='material' onChange={handleChange} value={files ? files.material : formData.material} style={{ width: "40px", height: "17px", fontSize: "12px" }} />
                    <select name='select' style={{ width: "100px", marginLeft: "2px", height: "20px", border: "none" }}></select>
                </div>
                <div className='plate_size'>
                    <input type='text' value="Size of plate element" style={{ width: "150px", height: "17px", textAlign: "center", fontSize: "12px" }} disabled />
                    <input type='text' name='plate_size' value={files?unit==='mm'?files.plate_size*1000:unit==='in'?files.plate_size*39.3701:files.plate_size:
                    unit==='mm'?formData.plate_size*1000:unit==='in'?formData.plate_size*39.3701:formData.plate_size} onChange={handleChange} style={{ width: "60px", height: "17px", fontSize: "12px" }} /> {unit}
                </div>
            </div>
            <div className='material_div_main'>
                <div className='span_div' style={{ width: "40%"}}>
                    <input type='text' value="Span" style={{ width: "80px", height: "17px", textAlign: "center", fontSize: "12px" }} disabled />
                    <input type='text' name='span' value={files?unit==='mm'?files.span*1000:unit==='in'?files.span*39.3701:files.span:
                    unit==='mm'?formData.span*1000:unit==='in'?formData.span*39.3701:formData.span} onChange={handleChange} style={{ width: "140px", height: "17px", fontSize: "12px" }} /> {unit}
                    <span>(ex : 3, 4, 5@5.5)</span>
                </div>
                <div className='plate_size'>
                    <div style={{ marginRight: "10px", display: "flex", alignItems: "center" }}><input type='checkbox' checked /><span style={{ fontSize: "13px" }}>Wing Wall: </span></div>
                    <input type='text' value="Thickness" style={{ width: "60px", height: "17px", textAlign: "center", fontSize: "12px" }} disabled />
                    <input type='text' name='thickness' value={files?unit==='mm'?files.thickness*1000:unit==='in'?files.thickness*39.3701:files.thickness:
                    unit==='mm'?formData.thickness*1000:unit==='in'?formData.thickness*39.3701:formData.thickness} onChange={handleChange} style={{ width: "60px", height: "17px", fontSize: "12px" }} /> {unit}
                </div>
            </div>
            <div className='skew_angle'>
                <input type='text' value="Skew Angle" style={{ width: "80px", height: "17px", textAlign: "center", fontSize: "12px" }} disabled />
                <input type="number" name='skew_angle' value={files ? files.skew_angle : formData.skew_angle} onChange={handleChange} style={{ width: "140px", height: "17px", fontSize: "12px" }} /><span style={{ fontSize: "14px" }}>[deg]</span>
            </div>
            <div className='Length_Unit_main'>
                <input value="Length-Unit" disabled style={{ width: "100px" }} />
                <select placeholder='M,mm,in' name='length_unit' value={files ? files.length_unit : formData.length_unit} onChange={handleChange}>
                    <option selected disabled>M,mm,in</option>
                    <option>m</option>
                    <option>mm</option>
                    <option>in</option>
                </select>
            </div>
            <div className='dimensions'>
                <span>Dimensions</span>
                <div className='dimensions_row_main'>
                    <div className='dimensions_row'>
                        <div className='input'>
                            <input className='inp1' disabled value="t1" />
                            <input className='inp2' name='t1' onChange={handleChange} value={files ? unit === 'mm' ? files.t1 / 1000 : unit === 'in' ? files.t1 / 39.3701 : files.t1 :
                                unit === 'mm' ? formData.t1 / 1000 : unit === 'in' ? formData.t1 / 39.3701 : formData.t1} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="t2" />
                            <input className='inp2' disabled name='t2' value={files ? unit === 'mm' ? files.t2 / 1000 : unit === 'in' ? files.t2 / 39.3701 : files.t2 :
                                unit === 'mm' ? formData.t2 / 1000 : unit === 'in' ? formData.t2 / 39.3701 : formData.t2}
                                onChange={handleChange} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="t3" />
                            <input className='inp2' name='t3' onChange={handleChange} value={files?unit==='mm'?files.t3*1000:unit==='in'?files.t3*39.3701:files.t3:
                    unit==='mm'?formData.t3*1000:unit==='in'?formData.t3*39.3701:formData.t3} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="t4" />
                            <input className='inp2' disabled={normaltype} name='t4' onChange={handleChange} value={files?unit==='mm'?files.t4*1000:unit==='in'?files.t4*39.3701:files.t4:
                    unit==='mm'?formData.t4*1000:unit==='in'?formData.t4*39.3701:formData.t4} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="a1" />
                            <input className='inp2' name='a1' onChange={handleChange} value={files?unit==='mm'?files.a1*1000:unit==='in'?files.a1*39.3701:files.a1:
                    unit==='mm'?formData.a1*1000:unit==='in'?formData.a1*39.3701:formData.a1} /> {unit}
                        </div>
                    </div>
                    <div className='dimensions_row'>
                        <div className='input'>
                            <input className='inp1' disabled value="a2" />
                            <input className='inp2' disabled name='a2' onChange={handleChange} value={files?unit==='mm'?files.a2*1000:unit==='in'?files.a2*39.3701:files.a2:
                    unit==='mm'?formData.a2*1000:unit==='in'?formData.a2*39.3701:formData.a2} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="a3" />
                            <input className='inp2' disabled={normaltype} name='a3' onChange={handleChange} value={files?unit==='mm'?files.a3*1000:unit==='in'?files.a3*39.3701:files.a3:
                    unit==='mm'?formData.a3*1000:unit==='in'?formData.a3*39.3701:formData.a3} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="a4" />
                            <input className='inp2' disabled name='a4' onChange={handleChange} value={files?unit==='mm'?files.a4*1000:unit==='in'?files.a4*39.3701:files.a4:
                    unit==='mm'?formData.a4*1000:unit==='in'?formData.a4*39.3701:formData.a4} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="b1" />
                            <input className='inp2' name='b1' onChange={handleChange} value={files?unit==='mm'?files.b1*1000:unit==='in'?files.b1*39.3701:files.b1:
                    unit==='mm'?formData.b1*1000:unit==='in'?formData.b1*39.3701:formData.b1} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="b2" />
                            <input className='inp2' disabled name='b2' onChange={handleChange} value={files?unit==='mm'?files.b2*1000:unit==='in'?files.b2*39.3701:files.b2:
                    unit==='mm'?formData.b2*1000:unit==='in'?formData.b2*39.3701:formData.b2} /> {unit}
                        </div>
                    </div>
                    <div className='dimensions_row'>
                        <div className='input'>
                            <input className='inp1' disabled value="b3" />
                            <input className='inp2' disabled={culverttype} name='b3' onChange={handleChange} value={files?unit==='mm'?files.b3*1000:unit==='in'?files.b3*39.3701:files.b3:
                    unit==='mm'?formData.b3*1000:unit==='in'?formData.b3*39.3701:formData.b3} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="b4" />
                            <input className='inp2' name='b4' onChange={handleChange} value={files?unit==='mm'?files.b4*1000:unit==='in'?files.b4*39.3701:files.b4:
                    unit==='mm'?formData.b4*1000:unit==='in'?formData.b4*39.3701:formData.b4} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="b5" />
                            <input className='inp2' disabled={normaltype} name='b5' onChange={handleChange} value={files?unit==='mm'?files.b5*1000:unit==='in'?files.b5*39.3701:files.b5:
                    unit==='mm'?formData.b5*1000:unit==='in'?formData.b5*39.3701:formData.b5} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="b6" />
                            <input className='inp2' disabled name='b6' onChange={handleChange} value={files?unit==='mm'?files.b6*1000:unit==='in'?files.b6*39.3701:files.b6:
                    unit==='mm'?formData.b6*1000:unit==='in'?formData.b6*39.3701:formData.b6} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="h1" />
                            <input className='inp2' name='h1' onChange={handleChange} value={files?unit==='mm'?files.h1*1000:unit==='in'?files.h1*39.3701:files.h1:
                    unit==='mm'?formData.h1*1000:unit==='in'?formData.h1*39.3701:formData.b6} /> {unit}
                        </div>
                    </div>
                    <div className='dimensions_row'>
                        <div className='input'>
                            <input className='inp1' disabled value="h2" />
                            <input className='inp2' name='h2' onChange={handleChange} value={files?unit==='mm'?files.h2*1000:unit==='in'?files.h2*39.3701:files.h2:
                    unit==='mm'?formData.h2*1000:unit==='in'?formData.h2*39.3701:formData.h2} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="h3" />
                            <input className='inp2' name='h3' onChange={handleChange} value={files?unit==='mm'?files.h3*1000:unit==='in'?files.h3*39.3701:files.h3:
                    unit==='mm'?formData.h3*1000:unit==='in'?formData.h3*39.3701:formData.h3} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="A" />
                            <input className='inp2' disabled name='A' onChange={handleChange} value={files?unit==='mm'?files.A*1000:unit==='in'?files.A*39.3701:files.A:
                    unit==='mm'?formData.A*1000:unit==='in'?formData.A*39.3701:formData.A} />[deg]
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="C" />
                            <input className='inp2' disabled name='C' onChange={handleChange} value={files?unit==='mm'?files.C*1000:unit==='in'?files.C*39.3701:files.C:
                    unit==='mm'?formData.C*1000:unit==='in'?formData.C*39.3701:formData.C} /> {unit}
                        </div>
                        <div className='input'>
                            <input className='inp1' disabled value="p" />
                            <input className='inp2' name='p' onChange={handleChange} value={files?unit==='mm'?files.p*1000:unit==='in'?files.p*39.3701:files.p:
                    unit==='mm'?formData.p*1000:unit==='in'?formData.p*39.3701:formData.p} /> {unit}
                        </div>
                    </div>
                </div>
            </div>
            <div className='import_div'>
                <span className='inp1' type='text' style={{ color: "white", fontSize: "14px", cursor: "pointer" }} onClick={() => { alert("Please Click on Choose File") }} value="Import" >Import</span>
                <input className='inp2' type='file' onChange={handleFileChange} />
                <button type='submit' onClick={handleSubmit} style={{ cursor: "pointer" }}>Save</button>
            </div>
        </div>
    )
}
