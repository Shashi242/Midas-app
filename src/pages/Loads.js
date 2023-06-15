import React, { useState } from 'react';
import "../Styles/Loads.css";

export const Loads = () => {

    const [factored1, setFactored] = useState(true);
    const [unfactored, setunFactored] = useState(true);
    const [sw, setSw] = useState(true);
    const [pavement, setPavement] = useState(true);
    const [soil, setSoil] = useState(true);
    const [uw, setUw] = useState(true);
    const [barrier, setBarrier] = useState(true);
    const [ms, setMs] = useState(true);
    const [swalk, setSwalk] = useState(true);
    const [st, setSt] = useState(true);
    const [tg, setTg] = useState(true);
    const [ss, setSs] = useState(true);

    const [formData, setFormData] = useState({
        combination: 'AASHTO-Std2K',
        factored: true,
        unfactored: true,
        selfweight: true,
        weight_density1: '23.5631',
        weight_density2: '20.4214',
        pavement_thickness: '0.09144',
        thickness: '0.09144',
        phi: '35',
        surcharge: '9.57605',
        submerged_WT: '6.096',
        LoadSlope_L: '1.5',
        LoadSlope_R: '1.5',
        GL: '1.00584',
        self_density: '8.75634',
        Additional_Load: '0',
        Median_Strip: '10.2157',
        sidewalk_WD: '23.5631',
        sidewalk_thickness: '0.3048',
        Crowd_Load: '4.78803',
        ClassofLoading: '1.00584',
        Eccentricity: "left",
        Settlement: '-0.009144',
        ST: '10',
        TG: '5',
        Shrinkage_Strain: '23.5631',
        Thermal_Coefficient: '1e-05',
        Force_Unit: 'kN,Kips,N',
        Length_Unit: 'M,mm,in'
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
        const fileName = 'Loads.json';
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
        };
    };

    const unit = files ? files.Force_Unit === 'kN,Kips,N' || files.Force_Unit === 'kN' ? 'kN/m' : files.Force_Unit : formData.Force_Unit === 'kN,Kips,N' || formData.Force_Unit === 'kN' ? 'kN/m' : formData.Force_Unit;
    const unit2 = files ? files.Length_Unit === 'M,mm,in' ? 'm' : files.Length_Unit : formData.Length_Unit === 'M,mm,in' ? 'm' : formData.Length_Unit;

    return (
        <div className='loads_parent'>
            <div className='loads_main'>
                <div className='comb_main'>
                    <div className='load_inp'>
                        <span>Load Combinations :</span>
                        <select name='combination' value={files ? files.combination : formData.combination} onChange={handleChange}>
                            <option>AASHTO-Std2K</option>
                        </select>
                        <input type='checkbox' name='factored' value={formData.factored} checked={factored1} onClick={() => { setFactored(!factored1) }} />Factored
                        <input type='checkbox' name='unfactored' value={formData.unfactored} checked={unfactored} onClick={() => { setunFactored(!unfactored) }} />Unfactored
                    </div>
                    <input className='define_div' value="Define Moving Load Code" />
                </div>
                <div className='density_parent'>
                    <div className='sw'><input type='checkbox' name='selfweight' value={formData.selfweight} checked={sw} onClick={() => { setSw(!sw) }} />Self Weight</div>
                    <div className='pavement'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='pavement' value={pavement} checked={pavement} onClick={() => { setPavement(!pavement) }} />Pavement :
                        </div>
                        <div className='div1'>
                            <span className='span1'>Weight Density</span>
                            <input value={files ? unit === 'Kips' ? files.weight_density1 * 0.2248 : unit === 'N' ? files.weight_density1 * 1000 : files.weight_density1 :
                                unit === 'Kips' ? formData.weight_density1 * 0.2248 : unit === 'N' ? formData.weight_density1 * 1000 : formData.weight_density1} name='weight_density1' onChange={handleChange} className='inp' />{unit}<sup>3</sup>
                        </div>
                        <div className='div2'>
                            <span className='span2'>Thickness</span>
                            <input value={files ? unit2 === 'mm' ? files.pavement_thickness * 1000 : unit2 === 'in' ? files.pavement_thickness * 39.3701 : files.pavement_thickness :
                                unit2 === 'mm' ? formData.pavement_thickness * 1000 : unit2 === 'in' ? formData.pavement_thickness * 39.3701 : formData.pavement_thickness} name='pavement_thickness' onChange={handleChange} disabled className='inp' /> {unit2}
                        </div>
                    </div>
                    <div className='pavement'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='soil' value={soil} checked={soil} onClick={() => { setSoil(!soil) }} />Soil :
                        </div>
                        <div className='div1'>
                            <span className='span1'>Weight Density</span>
                            <input value={files ? unit === 'Kips' ? files.weight_density2 * 0.2248 : unit === 'N' ? files.weight_density2 * 1000 : files.weight_density2 :
                                unit === 'Kips' ? formData.weight_density2 * 0.2248 : unit === 'N' ? formData.weight_density2 * 1000 : formData.weight_density2} name='weight_density2' onChange={handleChange} className='inp' />{unit}<sup>3</sup>
                        </div>
                        <div className='div2'>
                            <span className='span2'>Phi</span>
                            <input value={files ? unit === 'Kips' ? files.phi * 0.2248 : unit === 'N' ? files.phi * 1000 : files.phi :
                                unit === 'Kips' ? formData.phi * 0.2248 : unit === 'N' ? formData.phi * 1000 : formData.phi} name='phi' onChange={handleChange} className='inp' />[deg]
                        </div>
                    </div>
                    <div className='pavement surcharge'>
                        <div className='div1'>
                            <span className='span1'>Surcharge</span>
                            <input value={files ? unit === 'Kips' ? files.surcharge * 0.2248 : unit === 'N' ? files.surcharge * 1000 : files.surcharge :
                                unit === 'Kips' ? formData.surcharge * 0.2248 : unit === 'N' ? formData.surcharge * 1000 : formData.surcharge} name='surcharge' onChange={handleChange} className='inp' />{unit}<sup>3</sup>
                        </div>
                    </div>
                    <div className='pavement surcharge'>
                        <div className='div1' style={{ width: "50%", marginRight: "28%" }}>
                            <span className='span1' style={{ width: "60%" }}>Submerged Weight Density</span>
                            <input value={files ? unit === 'Kips' ? files.submerged_WT * 0.2248 : unit === 'N' ? files.submerged_WT * 1000 : files.submerged_WT :
                                unit === 'Kips' ? formData.submerged_WT * 0.2248 : unit === 'N' ? formData.submerged_WT * 1000 : formData.submerged_WT} name='submerged_WT' onChange={handleChange} className='inp' />{unit}<sup>3</sup>
                        </div>
                    </div>
                    <div className='pavement surcharge'>
                        <div className='div1' style={{ marginRight: "0%", width: "78%" }}>
                            <span className='span1' style={{ width: "30%" }}>Load Slope</span>
                            <span>(L) 1 :</span>
                            <input value="1.5" style={{ width: "17%" }} className='inp' disabled />
                            <span>(R) 1 :</span>
                            <input value="1.5" style={{ width: "17%" }} className='inp' disabled />
                        </div>
                    </div>
                    <div className='pavement'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='uw' value={uw} checked={uw} onClick={() => { setUw(!uw) }} />Underground Water :
                        </div>
                        <div className='div1' style={{ marginRight: "46%" }}>
                            <span className='span1' style={{ border: "none" }}>GL</span>
                            <input value={files ? unit2 === 'mm' ? files.GL * 1000 : unit2 === 'in' ? files.GL * 39.3701 : files.GL :
                                unit2 === 'mm' ? formData.GL * 1000 : unit2 === 'in' ? formData.GL * 39.3701 : formData.GL} name='GL' onChange={handleChange} className='inp' /><span style={{ marginRight: "auto", marginLeft: "1%" }}>{unit2}</span>
                        </div>
                    </div>
                    <div className='pavement'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='barrier' value={barrier} checked={barrier} onClick={() => { setBarrier(!barrier) }} />Barrier :
                        </div>
                        <div className='div1'>
                            <span className='span1'>Self Density</span>
                            <input value={files ? unit === 'Kips' ? files.self_density * 0.2248 : unit === 'N' ? files.self_density * 1000 : files.self_density :
                                unit === 'Kips' ? formData.self_density * 0.2248 : unit === 'N' ? formData.self_density * 1000 : formData.self_density} name='self_density' onChange={handleChange} className='inp' />{unit}<sup>3</sup>
                        </div>
                        <div className='div2'>
                            <span className='span2'>Additional Load</span>
                            <input value={files ? unit === 'Kips' ? files.Additional_Load * 0.2248 : unit === 'N' ? files.Additional_Load * 1000 : files.Additional_Load :
                                unit === 'Kips' ? formData.Additional_Load * 0.2248 : unit === 'N' ? formData.Additional_Load * 1000 : formData.Additional_Load} name='Additional_Load' onChange={handleChange} className='inp' /> {unit}<sup>3</sup>
                        </div>
                    </div>
                    <div className='pavement ms'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='ms' value={ms} checked={ms} onClick={() => { setMs(!ms) }} />Median Strip :
                        </div>
                        <div className='div1' style={{ marginRight: "27%" }}>
                            <input value={files ? unit === 'Kips' ? files.Median_Strip * 0.2248 : unit === 'N' ? files.Median_Strip * 1000 : files.Median_Strip :
                                unit === 'Kips' ? formData.Median_Strip * 0.2248 : unit === 'N' ? formData.Median_Strip * 1000 : formData.Median_Strip} name='Median_Strip' onChange={handleChange} className='inp' /><span style={{ marginRight: "auto", marginLeft: "2%" }}>{unit}<sup>3</sup></span>
                        </div>
                    </div>
                    <div className='pavement'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='swalk' value={swalk} checked={swalk} onClick={() => { setSwalk(!swalk) }} />SideWalk :
                        </div>
                        <div className='div1'>
                            <span className='span1'>Weight Density</span>
                            <input value={files ? unit === 'Kips' ? files.sidewalk_WD * 0.2248 : unit === 'N' ? files.sidewalk_WD * 1000 : files.sidewalk_WD :
                                unit === 'Kips' ? formData.sidewalk_WD * 0.2248 : unit === 'N' ? formData.sidewalk_WD * 1000 : formData.sidewalk_WD} name='sidewalk_WD' onChange={handleChange} className='inp' />{unit}<sup>3</sup>
                        </div>
                        <div className='div2'>
                            <span className='span2'>Thickness</span>
                            <input value={files ? unit2 === 'mm' ? files.sidewalk_thickness * 1000 : unit2 === 'in' ? files.sidewalk_thickness * 39.3701 : files.sidewalk_thickness :
                                unit2 === 'mm' ? formData.sidewalk_thickness * 1000 : unit2 === 'in' ? formData.sidewalk_thickness * 39.3701 : formData.sidewalk_thickness} name='sidewalk_thickness' onChange={handleChange} className='inp' /> {unit2}
                        </div>
                    </div>
                    <div className='pavement cl'>
                        <div className='div1' style={{ marginRight: "45%" }}>
                            <span className='span1' style={{ marginRight: "1%" }}>Crowd Load</span>
                            <input value={files ? unit === 'Kips' ? files.Crowd_Load * 0.2248 : unit === 'N' ? files.Crowd_Load * 1000 : files.Crowd_Load :
                                unit === 'Kips' ? formData.Crowd_Load * 0.2248 : unit === 'N' ? formData.Crowd_Load * 1000 : formData.Crowd_Load} name='Crowd_Load' onChange={handleChange} className='inp' /><span style={{ marginRight: "auto", marginLeft: "2%" }}>{unit}<sup>3</sup></span>
                        </div>
                    </div>
                </div>
                <div className='density_parent'>
                    <div className='pavement ll'>
                        <div className='pavement_text'>
                            <input checked type='checkbox' disabled />Live Load :
                        </div>
                        <div className='div1' style={{ marginRight: "33%", width: "45%" }}>
                            <span className='span2' style={{ width: "50%" }}>Class of Loading</span>
                            <select value={files ? unit === 'Kips' ? files.ClassofLoading * 0.2248 : unit === 'N' ? files.ClassofLoading * 1000 : files.ClassofLoading :
                                unit === 'Kips' ? formData.ClassofLoading * 0.2248 : unit === 'N' ? formData.ClassofLoading * 1000 : formData.ClassofLoading} name='ClassofLoading' onChange={handleChange} className='inp' disabled style={{ width: "70%", height: "100%", textAlign: "left" }}>
                                <option>H15-44</option>
                            </select>
                        </div>
                    </div>
                    <div className='pavement ecc'>
                        <div className='div1' style={{ marginRight: "28%", width: "50%" }}>
                            <span className='span1' style={{ marginRight: "0.5%", width: "37%" }}>Eccentricity</span>
                            <span className='span2' style={{ width: "37%", display: "flex", marginRight: "auto", justifyContent: "space-between" }}>
                                <input type='radio' checked disabled />Left
                                <input type='radio' disabled />Right
                            </span>
                        </div>
                    </div>
                </div>
                <div className='density_parent'>
                    <div className='pavement stm'>
                        <div className='pavement_text'>
                            <input type='checkbox' disabled />Settlement :
                        </div>
                        <div className='div1' style={{ marginRight: "56%", width: "22%" }}>
                            <input className='span2' value={files ? unit2 === 'mm' ? files.Settlement * 1000 : unit2 === 'in' ? files.Settlement * 39.3701 : files.Settlement :
                                unit2 === 'mm' ? formData.Settlement * 1000 : unit2 === 'in' ? formData.Settlement * 39.3701 : formData.Settlement} name='Settlement' onChange={handleChange} disabled style={{ width: "87%" }} /><span style={{ marginRight: "auto", marginLeft: "1%" }}>{unit2}</span>
                        </div>
                    </div>
                </div>
                <div className='density_parent'>
                    <div className='pavement stp'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='st' value={st} checked={st} onClick={() => { setSt(!st) }} />System Temperature :
                        </div>
                        <div className='div1' style={{ marginRight: "26%", width: "45%" }}>
                            <span className='span2' style={{ width: "30%" }}>T[+/-]</span>
                            <input value={files ? files.ST : formData.ST} name='ST' onChange={handleChange} className='inp' style={{ marginRight: "1%", width: "17%", height: "100%", textAlign: "left" }} /><span style={{ marginRight: "auto" }}>[T]</span>
                        </div>
                    </div>
                    <div className='pavement stp'>
                        <div className='pavement_text'>
                            <input type='checkbox' name='tg' value={tg} checked={tg} onClick={() => { setTg(!tg) }} />Temperature Gradient:
                        </div>
                        <div className='div1' style={{ marginRight: "26%", width: "45%" }}>
                            <span className='span2' style={{ width: "30%" }}>Delta T</span>
                            <input value={files ? files.TG : formData.TG} name='TG' onChange={handleChange} className='inp' style={{ marginRight: "1%", width: "17%", height: "100%", textAlign: "left" }} /><span style={{ marginRight: "auto" }}>[T]</span>
                        </div>
                    </div>
                </div>
                <div className='density_parent'>
                    <div className='pavement'>
                        <div className='pavement_text' >
                            <input type='checkbox' name='ss' value={ss} checked={ss} onClick={() => { setSs(!ss) }} />Shrinkage Strain :
                        </div>
                        <div className='div1 sst' style={{ backgroundColor: "blueviolet", width: "12%", marginLeft: "1%" }}>
                            <input value={files ? files.Shrinkage_Strain : formData.Shrinkage_Strain} name='Shrinkage_Strain' onChange={handleChange} className='inp' style={{ width: "100%" }} />
                        </div>
                        <div className='div2 sst2' style={{ marginRight: "15%" }}>
                            <span className='span2' style={{ border: "none", marginRight: "2%" }}>Thermal Coefficient: </span>
                            <input value={files ? files.Thermal_Coefficient : formData.Thermal_Coefficient} name='Thermal_Coefficient' onChange={handleChange} disabled className='inp' style={{ marginRight: "1%" }} /> 1/[T]
                        </div>
                    </div>
                </div>
                <div className='force_len'>
                    <div className='force_unit'>
                        <span>Force-Unit</span>
                        <select value={files ? files.Force_Unit : formData.Force_Unit} name='Force_Unit' onChange={handleChange}>
                            <option disabled selected>kN,Kips,N</option>
                            <option>kN</option>
                            <option>Kips</option>
                            <option>N</option>
                        </select>
                    </div>
                    <div className='force_unit'>
                        <span>Length-Unit</span>
                        <select value={files ? files.Length_Unit : formData.Length_Unit} name='Length_Unit' onChange={handleChange}>
                            <option disabled selected>M,mm,in</option>
                            <option>M</option>
                            <option>mm</option>
                            <option>in</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='import_div'>
                <span className='inp1' type='text' style={{ color: "white", fontSize: "14px", cursor: "pointer" }} onClick={() => { alert("Please Click on Choose File") }} value="Import" >Import</span>
                <input className='inp2' type='file' onChange={handleFileChange} />
                <button type='submit' onClick={handleSubmit} style={{ cursor: "pointer" }} >Save</button>
            </div>
        </div>
    )
}
