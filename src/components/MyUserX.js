import React, { useState, useEffect} from "react";
import { Link, Navigate, useNavigate} from "react-router";

import Template from "./common/template/Template";
import AlertBox from "./common/template/AlertBox";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
 
  Legend,
  
} from 'recharts';



import UserService from "../services/user.service";
import AuthService from "../services/auth.service";









export default function MyUserX () {

  
  const [ubicacionId, setUbicacionId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [uxId, setUxId] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showServiceResult, setShowServiceResult] = useState(false);
  const [showServiceAction, setShowServiceAction] = useState(false);
  const [showUxSurvey, setShowUxSurvey] = useState(false);


  const [message, setMessage] = useState(false);

  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);

  const [loading, setLoading] = useState(false);

  const wrapperClass = `w-full h-full p-4 mb-2 mx-auto border border-slate-600  rounded-lg md:rounded-b-none  shadow-md bg-gradient-to-br from-neutral-200 via-white to-neutral-200`;

  const [user, setUser]  = useState(AuthService.getCurrentUser());
 
  
  //const [message, setMessage] = useState("");
 


  const UbicacionPicker=({user}) => {

      
      const [ubsContent, setUbsContent] = useState(false);
      

      useEffect(()=>{

      
      
        //let ignore = false;
    
        function createOptions() {
          
          return {
            uId: user.uId,           
                     
          };
        }
        
        const options = createOptions();
        
        if(!options.uId || options.uId === null){
          setUbsContent(false);
          setError(true)
          setMessage('Los parametros recibidos no son los correctos, no se puede continuar.')
          //setMessage("no se recibieron los parametros correctos.")
          
        } else {
    
            UserService.getUbs(options.uId).then(
    
                (response) => {
    
                    setUbsContent(response?.data);
                    //setContent(response?.data);
                    setLoading(false);
                    console.log(response?.data)
                    
    
                    if(response?.data?.message){
                      
                      console.log(response?.data?.message)
                      
                    }
                    
                    
                }
                
           
                ,
    
                (error) => {
                  const _content =
                    (error?.response && error?.response.data) ||
                    error?.message ||
                    error?.toString();
                  
                  setUbsContent(false);
                  //setContent(_content);
                  setError(true);
                  setMessage(_content)
                  
                
                }
              
            )
    
          
        }  
    
    
      },[user]);
    
      
      const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        
        const form = event.target;

        const formData = new FormData(form);
        
        
        const onSubmitUbId = formData.get("selectedUbId");
        
        if(onSubmitUbId){

          setUbicacionId(onSubmitUbId);
          setShowServices(true);

        } else {

          setUbicacionId(false)
          setShowServices(false)
        }
          
        
        
        //console.log(ubicacionId)
      }

      const GoButton = ({className}) => {

          return (   
     
            <button  type="submit" id="submit"
                    className={className + 
                      `h-8 p-2 rounded-md border border-white 
                      
                      bg-gradient-to-b from-sky-400 to-sky-800 
                          hover:shadow-md hover:bg-sky-600 
                      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-150
                      `                    
                    } 
                    disabled={loading} >
              
              <span className="text-white font-semibold text-sm">
                
                <svg fill="#FFFFFF" width="12px" height="12px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    
                      <path d="M0 13.024q0-2.624 1.024-5.056t2.784-4.16 4.16-2.752 5.056-1.056q2.656 0 5.056 1.056t4.16 2.752 2.784 4.16 1.024 5.056q0 3.616-1.984 6.816l7.072 7.040q0.864 0.896 0.864 2.144t-0.864 2.112-2.144 0.864-2.112-0.864l-7.040-7.040q-3.2 1.952-6.816 1.952-2.656 0-5.056-1.024t-4.16-2.784-2.784-4.128-1.024-5.088zM4 13.024q0 2.464 1.216 4.544t3.296 3.264 4.512 1.216q1.824 0 3.488-0.704t2.88-1.92 1.92-2.88 0.736-3.52-0.736-3.52-1.92-2.848-2.88-1.92-3.488-0.736q-2.432 0-4.512 1.216t-3.296 3.296-1.216 4.512z"></path>
                </svg>
              </span>
              
                    
            </button>
                  
          );
        
      }

      const SelectDrop = ({ubicaciones}) => {

        const [selectedOption, setSelectedOption] = useState(''); // Declare a state variable...
        // ...
        const optionClassName = ``;
        const selectClassName = `border border-slate-500 bg-neutral-50 rounded-md p-2 w-1/3 h-8 text-xs font-light`;

        const handleChange = (event) =>{
          
                 
          setSelectedOption(event.target.value);
          console.log("option changed!")
          console.log(event.target.value)
          
          
        }

        return (
          <select
                    name="selectedUbId"
                    value={selectedOption} // ...force the select's value to match the state variable...
                    onChange={e=> handleChange(e)} // ... and update the state variable on any change!
                    className={selectClassName + ``}
                  >
                      <option value="">Seleccione una ubicación</option>
                    {
          
                      ubicaciones.map((ub) => (
                        <option key={`ub-key-${ub.id}`} 
                          value={ub.id} 
                        >{ub.name}
                        </option>
          
          
                      ))  
          
                    }
          </select>
        );
        
      }

      return (
        
                  
        <div className="flex flex-col relative z-1">
            
                <p className="text-xs md:text-md mb-0 py-2">Estas son las ubicaciones habilitadas para su organización ({user.uId}): </p>
                
                {ubsContent && (   
  
                
                <form onSubmit={handleSubmit}>
                  
                  <SelectDrop ubicaciones={ubsContent?.ubicaciones}/>
                  &nbsp;
                  <GoButton />
                    

                  
                </form>
                
                )}
                
              
                            
        </div>
  
      );
  
      
  }

 
  const ShowServices=({ubicacionId})=>{   
    
    
    //const [message, setMessage] = useState("");
    const [servicesContent, setServicesContent] = useState(null);
  
      useEffect(()=>{

        
          function createOptions() {
          
            return {
                       
              ubId: ubicacionId         
            };
          }
          
          const options = createOptions();

          if(!options || options.ubId === undefined){
            setServicesContent(false);
            setError(true)
            setMessage('No se recibieron los parametros adecuados para continuar. Por favor contacte el administrador.')
            //setMessage("no se recibieron los parametros correctos.")
            
          } else {
            //setLoading(true)
    
            UserService.getServices(options.ubId).then(
    
                  (response) => {
    
                      
                    
                      setServicesContent(response?.data);
                      setShowServices(true);
                      //setContent(response?.data)
                      console.log(response?.data)
    
                      if(response?.data?.message){
                        setMessage(response?.data.message)
                        
                      }
                      console.log(response?.data?.message)
    
                      setLoading(false);
                  
                  },
    
                  (error) => {
                    const _content =
                      (error?.response && error?.response.data) ||
                      error?.message ||
                      error?.toString();
                    
                    setServicesContent(_content);
                    setError(true);
                    
                    setLoading(false)
                  
                  }
                
            )
    
            
          }

         

      },[ubicacionId]); 
      

    function RenderDetractorList({detractorListContent}){
  
      let checkIconClass = `fill-lime-500`;

      function handleLensClick (servId){
        console.log('Lens button clicked !!!!!!');
        console.log(servId);

        setLoading(true);
        
        setMessage(false);
        setError(false);
        
        //setServicesContent(''); 
        setShowModal(true);
        setServiceId(servId);
        setShowServiceResult(true);
      }

      function handleActionClick (servId,uxId){
        console.log('action button clicked !!!!!!');
        console.log(servId);

        setLoading(true);
        
        setMessage(false);
        setError(false);
        
        //setServicesContent(''); 
        setShowModal(true);
        setServiceId(servId);
        setUxId(uxId);
        
        setShowServiceAction(true);
      }
    
      if(detractorListContent){
    
        return(
          <div className="mb-2 h-64 overflow-y-auto">
                
            <table id="eval-display" 
              className="bg-white opacity-90 text-[8px] sm:text-sm shadow-md w-full  ">
                             
            
                  <thead id="table-head" 
                          className="border border-b-zinc-300 " >
                    <tr className="bg-gradient-to-b from-stone-300 to-white  font-semibold sticky top-0 z-40">
                      <td className="p-2"   >
                        #
                      </td>
                      <td className="p-2"   >
                        Fecha
                      </td>
                      <td className="p-2"   >
                        Ubicacion
                      </td>
                      <td className="p-2"  >
                       Servicio</td> 
                       <td className="p-2"  >
                       Calif.</td> 
                       
                       <td className="p-2">Tarea</td>
                      <td className="p-2">Accion</td>
                      
  
                    </tr>
  
  
  
                  </thead>
                  <tbody className="text-zinc-600 ">
            
              
              {
                detractorListContent.map((row,index) => (
                  
                  <tr className="even:bg-gray-50 odd:bg-white" key={'tr-'+index+'-'+row.service_id} >
                    <td className="p-2" id={'td-i-'+row.ux_id}   >
                      { index+1  }
                    </td>
                    <td className="p-2 " id={'td-ux-date-created-'+row.ux_id}   >
                      { row.ux_date_created  }
                    </td>
                    <td className="p-2 " id={'td-ub-name-'+row.ux_id}   >
                      { row.ubicacion_name }
                    </td>
                    <td className="p-2 " id={'td-serv-name-'+row.ux_id}   >
                      { row.service_name }
                    </td>
                    <td  id={'td-calif-'+row.ux_id} className={`p-2 relative group
                      ${(row.ux_feedback_value === "3")? 
                        (`bg-yellow-400`):(` `)}
                        ${(row.ux_feedback_value === "2")?
                          (`bg-orange-400`):(` `)}
                          ${(row.ux_feedback_value === "1")? 
                            (`bg-red-400`):(` `)}
                    `}>
                      
                      {row.ux_feedback_value}
                      
                        <span id={'span-ux_comments-'+row.ux_id} 
                          className={`absolute w-40 h-fit right-full sm:left-0 top-0 
                                      p-2
                                      transition delay-50 duration-200 ease-in-out
                                      
                                    text-xs font-light text-slate-700 bg-white
                                    
                                    rounded border border-slate-700
                                    shadow-md
                                     
                                        ${row.ux_comment && 
                                          (` opacity-0 -z-50 group-hover:opacity-100 group-hover:z-50 `)
                                        }
                                    `} >
                          { row.ux_comment } {row.ux_bad_ux_id + '-'+row.ux_bad_comment}
                        </span>
                        
                      
                      
                    </td> 
                    <td className={``} id={'td-task-id'+row.ux_id}>
                      {row.ux_is_action_taken && (

                        <div className="relative group">
                          <svg className={checkIconClass} height="16px" width="16px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path className="cls-1" d="M13,5.28671,6.18205,12,3,8.86709l1.36346-1.343,1.87517,1.8462L11.69312,4Z"/>
                          </svg>
                          <span id={'span-task-'+row.task_id} 
                          className={`absolute w-40 h-fit  right-full sm:left-0 top-0 
                                        p-2
                                        transition delay-50 duration-200 ease-in-out
                                          
                                        text-xs font-light text-slate-700 bg-white
                                        
                                        rounded border border-slate-700
                                        shadow-md
                                        ${!row.ux_task_id && 
                                          (` hidden `)
                                        }
                                        ${row.ux_task_id && 
                                          (` opacity-0 -z-50 group-hover:opacity-100 group-hover:z-50 `)
                                        }
                                    `} >
                                          { row.task_task } <br/>
                                          {row.task_description} <br/>
                                          Asignada a:&nbsp;{row.user_firstname}&nbsp;{row.user_lastname}<br/>
                                          Plazo:{row.task_due_date}<br/>
                                          {row.task_is_complete &&
                                                        (<span className="text-xs">
                                                          Completada <svg className={checkIconClass} height="16px" width="16px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <path className="cls-1" d="M13,5.28671,6.18205,12,3,8.86709l1.36346-1.343,1.87517,1.8462L11.69312,4Z"/>
                                                          </svg>
                                                          Fecha Completada:

                                                        </span>
                                                          
                                                        )
                                                      }

                          </span>
                        
                        </div>
                        
                        
                      
                      
                        )
                        
                      
                      }
                      
                    </td>
                    
                    <td id={'td-action-btns-'+row.ux_id} className="">
                      <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                        onClick={()=>handleLensClick(row.service_id,row.ux_id)}>🔍
                      </button>&nbsp;
                      {
                        !row.ux_is_action_taken &&
                          (
                            <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                              onClick={()=>handleActionClick(row.service_id,row.ux_id)}>📢
                            </button>
                          )
                        
                      }
                      
                    </td>
                    
                  
                  </tr> 
                  
            
                ))
              }
              </tbody>
              </table>
            
            
          </div>
        );
    
      } else {
    
        return(
          
            <p>no se pudo cargar la info</p>
          
    
        );
    
      }
    
    }

    function RenderServicesList({servicesListContent}){
  
      

      function handleLensClick (servId){
        console.log('Lens button clicked !!!!!!');
        console.log(servId);

        setLoading(true);
        
        setMessage(false);
        setError(false);
        
        //setServicesContent(''); 
        setShowModal(true);
        setServiceId(servId);
        setShowServiceResult(true);
      }

      function handleActionClick (servId,uxId){
        console.log('action button clicked !!!!!!');
        console.log(servId);

        setLoading(true);
        
        setMessage(false);
        setError(false);
        
        //setServicesContent(''); 
        setShowModal(true);
        setServiceId(servId);
        setUxId(uxId);
        
        return Navigate
      }
    
      if(servicesListContent){
    
        return(
          <div className="mb-2 h-64 overflow-y-auto">
                
            <table id="services-list-display" 
              className="bg-white opacity-90 text-[8px] sm:text-sm shadow-md w-full  ">
                             
            
                  <thead id="table-head" 
                          className="border border-b-zinc-300 " >
                    <tr className="bg-gradient-to-b from-stone-300 to-white  font-semibold sticky top-0 z-40">
                      <td className="p-2"   >
                        #id
                      </td>
                      <td className="p-2"   >
                        Nombre
                      </td>
                      
                      <td className="p-2"  >
                       Ux avg. </td> 
                        
                       
                       
                      <td className="p-2">Accion</td>
                      
  
                    </tr>
  
  
  
                  </thead>
                  <tbody className="text-zinc-600 ">
            
              
              {
                servicesListContent.map((row,index) => (
                  
                  <tr className="even:bg-gray-50 odd:bg-white" key={'tr-'+index+'-'+row.service_id} >
                    <td className="p-2" id={'td-i-'+row.service_id}   >
                      { row.service_id  }
                    </td>
                    <td className="p-2 " id={'td-ux-date-created-'+row.service_id}   >
                      { row.service_name  }
                    </td>
                    
                    
                    <td  id={'td-avg-'+row.service_id} 
                        className={`p-2 ` 
                           
                          }>
                      
                      {row.avg_ux_value}
                      
                      
                    </td> 
                    
                    
                    <td id={'td-action-btns-'+row.ux_id} className="">
                      <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                        onClick={()=>handleLensClick(row.service_id,row.ux_id)}>🔍
                      </button>&nbsp;
                      {
                        !row.ux_is_action_taken &&
                          (
                            <>
                            <a href={'http://localhost:3000/uxsurvey?sID='+row.service_id+'&c='+row.code_verifier} target="_blank" rel="noreferrer">
                              <button className="w-4 h-4 bg-white text-white rounded-full hover:shadow-sm opacity-50 hover:opacity-100" 
                                >📢
                              </button>
                            </a>
                            </>
                        )
                        
                      }
                      
                    </td>
                    
                  
                  </tr> 
                  
            
                ))
              }
              </tbody>
              </table>
            
            
          </div>
        );
    
      } else {
    
        return(
          
            <p>no se pudo cargar la info</p>
          
    
        );
    
      }
    
    }

    function RenderBarChart({graphData}){
  
      console.log(graphData);
      const data = graphData;
      
        
      if(graphData){
    
        return (
          <div className="bg-neutral-100 border border-slate-700 rounded-md mb-2 overflow-auto text-[8px]">
            <ComposedChart
              layout="horizontal"
              width={300}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 5,
                bottom: 20,
                left: 5,
            }}
          >
              <CartesianGrid stroke="#f5f5f5" />
              <YAxis type="number" domain={[0, 10]} allowDataOverflow allowDecimals label={{ value: '# Calificaciones', angle: -90, position: 'insideLeft' }}/>
              <XAxis dataKey="name" type="category" scale="band" />
              <Tooltip />
              <Legend />
              
              <Bar dataKey="1" barSize={10} fill="#F93827" />
              <Bar dataKey="2" barSize={10} fill="#FF9D23" />
              <Bar dataKey="3" barSize={10} fill="#FFD65A" />
              <Bar dataKey="4" barSize={10} fill="#D3EE98" />
              <Bar dataKey="5" barSize={10} fill="#A0D683" />
              <Line dataKey="Average" stroke="#41B3A2" />
            </ComposedChart>
            
          </div>
          
        );
    
      } 
    
    }
  
    return (
      
         
        <div className={`flex flex-col relative z-1  `}>
                            
                
                {servicesContent && (   
                <>
                  <h5 className="text-slate-700 mt-2 mb-1">Ubicacion: {servicesContent?.ubicacion?.name+'[id:'+servicesContent?.ubicacion?.id+']'}</h5>
                  <h6 className="text-slate-700 mb-1">Resumen de Ux - este mes :</h6>
                  <RenderBarChart graphData={servicesContent?.uxData} />
                  <h6 className="text-slate-700 mt-2">Maestro de servicios:</h6>
                  <RenderServicesList servicesListContent={servicesContent?.servicesList}/>
                  <h6 className="text-slate-700 mt-2">Últimos detractores:</h6>
                  <RenderDetractorList detractorListContent={servicesContent?.lastBadBatch}/>
                </>
                )}
                                            
        </div>
 
    );
    

  }

  const ServiceResult=({serviceId})=>{   
    
    //const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState("");
    const [serviceContent, setServiceContent] = useState(false);
    

    console.log(serviceId);
    
  
    useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";

      function createOptions() {
          
        return {
                   
          servId: serviceId,           
        };
      }
      
      const options = createOptions();

      if(!options){

        setServiceContent(false);
        setError(true)
        setMessage("no se recibieron los parametros correctos.")
        
      } else {

           
        //setLoading(true)

        UserService.getService(options.servId).then(

          (response) => {

            console.log(response);
            console.log(response?.data);
            console.log(response?.data.service_ux_count_grouped);
            setServiceContent(response?.data);
            
            //setAvgResult(response.data.service)
            setMessage(response?.data.message);
            
            setShowServiceResult(true);
            setLoading(false);
             
            
          
          
          },

          (error) => {
            const _content =
              (error?.response && error?.response.data) ||
              error?.message ||
              error?.toString();
            
            setError(_content);
            
            
          
          }
        
        )
          
      }  
        
     
     
  
    }, [serviceId]);

    function RenderAvgOdo({result}){
  
      const RADIAN = Math.PI / 180;

      const data = [
        { name: 'Detractores: 1 al 3', value: 108, color: '#ff6666' },
        { name: 'Promotores: 4 y 5', value: 72, color: '#ccff66' },
        //{ name: 'Detractores', value: 25, color: '#0000ff' },
      ];

      const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">

              <p className="label">{`${payload[0].name}`}</p>
              
        
            </div>
          );
        }
      
        return null;
      };

      const AvgResultBox = ({ result }) => {
        
          return (
            <div className={`border border-slate-500 p-1  
             

            `}>

              <p className="text-xs text-slate-700 text-center m-0">Ux Promedio: {result}</p>
              
        
            </div>
          );
        
      
        
      };

      
      

      const cx = 80;
      const cy = 100;
      const iR = 50;
      const oR = 80;

      const value = result*180/5;
      const roundedValue = value.toFixed(2);
      const roundedResult = Math.round(result * 100) / 100

      

      const needle = (value, data, cx, cy, iR, oR, color) => {

        let total = 0;
        data.forEach((v) => {
          total += v.value;
        });
        
        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy - 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
          <circle key="circle-1234" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
          <path key="path-1234" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];

      };

    
      if(result){
    
        return(
          <div className="bg-neutral-100 border border-slate-700 rounded-md mb-2">
            
            <PieChart width={cx*2} height={cy}>
              <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data}
                  cx={cx}
                  cy={cy}
                  innerRadius={iR}
                  outerRadius={oR}
                  fill="#8884d8"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
              </Pie>
                {needle(value, data, cx, cy, iR, oR, ' #afafb1')}
                <Tooltip content={<CustomTooltip />}/>
                
            </PieChart>
            <AvgResultBox result={roundedResult}/>
              
          </div>
        );
    
      } else {
    
        return(
          
            <p>no se pudo cargar el gráfico</p>
          
    
        );
    
      }
    
    }//end avg_odo

    

    function RenderPie({groupedUxData}){
  
      console.log(groupedUxData);
      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

      const RADIAN = Math.PI / 180;

      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
          <text className="small" x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      const data = groupedUxData;
      let detractors = 0;
      let promoters = 0;
      let total = 0;
      

      for (let i=0; i<data.length; i++){
        total += parseInt(data[i].value, 10)

        if(data[i].name <= 3){
          detractors += parseInt(data[i].value, 10)
        } else {
          promoters += parseInt(data[i].value, 10)
        }
        
        data[i].value = parseInt(data[i].value, 10)
       
      }

      

      const ResultBox = ({ promoters, detractors, total }) => {
        
          return (
            <div className={`border border-slate-500 p-1  
             

            `}>

              <p className="text-xs text-slate-700">
                Número de detractores: {detractors} ({Math.round(detractors/total*100)}%)<br/>
                Número de promotores: {promoters} ({Math.round(promoters/total*100)}%)
              </p>
              
        
            </div>
          );
        
      
        
      };

    
      if(groupedUxData){
    
        return (
          <div className="bg-neutral-100 border border-slate-700 rounded-md mb-2">
            <PieChart width={160} height={150}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <ResultBox promoters={promoters} detractors={detractors} total={total}/>
          </div>
          
        );
    
      } 
    
    }

    return (
      
      <div className="flex flex-col mx-auto bg-gradient-to-br from-neutral-200 to-zinc-300 via-white w-11/12 rounded-md shadow-md border border-slate-700 p-2 overflow-x-auto ">
          
              <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Resultados de Ux </h1>
              <p className="text-sm md:text-md mb-0">Servicio: {serviceContent.service?.name} </p>
              
              {serviceContent ? (   
                <div className="mx-auto mt-2 flex flex-row ">
                  <div className="flex-col">
                    <p className={`text-center text-sm text-slate-700`}>
                      Ux Promedio<br/>
                      <span className="text-xs text-slate-500 m-0">(promedio de calificaciones - &nbsp;último mes)</span>
                    </p>    
                    <RenderAvgOdo result={serviceContent.service_ux_avg.avg_feedback_value}/>
                  </div>
                  <div className="">
                    <p className={`text-center text-sm text-slate-700`}>
                      Calificaciones recibidas<br/>
                      <span className="text-xs text-slate-500 m-0">(calificaciones recibidas - &nbsp;último mes)</span>
                    </p> 
                    <RenderPie groupedUxData={serviceContent.service_ux_count_grouped}/>
                  </div>         
                </div>

              ) : (

                <div className="flex">
                  <svg className="animate-spin h-8 w-8 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>

              )}
            
                           
      </div>
 
    );
  
  }

  const ServiceAction=({serviceId,uxId})=>{   
    
    const [loading, setLoading] = useState(false);
    //const [message, setMessage] = useState("");
    const [serviceContent, setServiceContent] = useState("");
    const [content, setContent] = useState("");

    const [obs, setObs] = useState("");
    const [action, setAction] = useState('asign-task');
    const [contact, setContact] = useState(null);

    let inputClass = `h-8 text-xs font-light float-right`;
    let labelClass = `text-xs font-semibold`;
    

    console.log(serviceId);
    
    let navigate = useNavigate();
    
    const handleContact = (event) => {
      setContact(event.target.value);
      console.log('contacto cambiado a '+event.target.value)
    }
    const handleAction = (event) => {
      console.log("se escogio la acción: ASignar Tarea ");
      setAction(event.target.value);
    }

    const handleSubmit = (event) => {
      
      event.preventDefault();

      setLoading(true);
      
      const form = event.target;

      const formData = new FormData(form);
      const values = [...formData.entries()];
      const formElements = form.elements;
      
      const onSubmitUserId = formData.get("user_id");
      const onSubmitTask = formData.get("task");
      const onSubmitDescription = formData.get("description");
      
      if (!error) {
                   
        const data = {

          //feedback_value: parseInt(formData.get("ux-feedback-value")),
          //comments: formData.get("comments"),
          //feedback_value: parseInt(onSubmitUxValue, 10),
          user_id: contact,
          task: "atencion-reclamo-urgente",
          description: onSubmitDescription,

          


        }

        console.log(data);
            
        UserService.setTask(serviceId,uxId, data )
            .then(
              (response) => {
              
  
                  setContent(response.data);
                  
                  if(response.status === 204){
                    setError(error + response.statusText)
                    CancelProcessing();
                   
                  }
                  
                  console.log(response);              
                  //console.log(response.status);
                  //console.log(response.statusText)
    
                  //console.log(response);              
                  console.log(response.status);
                  console.log(response.statusText)
                  
                  //if(response.data.message !== undefined){
                  console.log(response.data?.message)
                  setMessage(response.data?.message)
                  //}
                  
                  
                  //localStorage.setItem("cmx_task_set",true)
                  setLoading(false);
                  setShowModal(false);
                  setShowServiceAction(false);
                  
                     
                   
  
              })
              .catch( 
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message || error.statusText ||
                    error.toString();
                  setMessage(resMessage);
                  let errorMsg = 'No se pudo procesar la operacion: ';
                  setError(errorMsg + resMessage)
                  CancelProcessing();
                }
              );
      }
      
      //console.log(ubicacionId)
    }

    const SaveActionButton = ({loading, className, children}) => {

      if(loading){
        
        return (   
          <button className={className + ` bg-slate-600 border-1 border-white  rounded-md m-1 p-1 relative text-left`} disabled={loading}>
            <svg className="absolute left-1 animate-spin h-6 w-6 fill-white" viewBox="0 0 24 24">
              <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
            </svg>
            <span className="text-white ml-8">Loading</span>
          </button>   
        );
      
      } else {

        return (   
  
          <div className="text-center mt-2 ">  
            <button  type="submit" id="submit"
                    className={className + 
                      `flex flex-row w-fit
                      p-2 rounded-md border border-white 
                      text-sm font-semibold text-white
                      bg-gradient-to-b from-sky-400 to-sky-800 
                      hover:shadow-md hover:bg-sky-600 
                      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-150
                      `                    
                    } 
                    disabled={loading} >
              <div className="flex flex-row">

              <svg className={`fill-white mt-1`} height="16px" width="16px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M12.75116,7.3384,14,6.824l-.9144-2.2176-1.24884.51438A4.7393,4.7393,0,0,0,10.892,4.172l.51838-1.24642L9.19757,2.004,8.67839,3.2512a4.71535,4.71535,0,0,0-.67681-.04879,4.8031,4.8031,0,0,0-.66239.04643L6.82317,2l-2.21676.9144.51517,1.24884A4.74113,4.74113,0,0,0,4.172,5.108l-1.2472-.51844L2.00316,6.80243l1.24725.51918a4.81569,4.81569,0,0,0-.00242,1.34L2,9.176l.91356,2.2176,1.24883-.51438a4.823,4.823,0,0,0,.94477.94882l-.51839,1.2472,2.2144.92083.51844-1.24647a4.67338,4.67338,0,0,0,.67439.048,4.73749,4.73749,0,0,0,.66555-.04637L9.176,14l2.2176-.91361-.51438-1.24878a4.82623,4.82623,0,0,0,.94955-.94483l1.24563.51845.92161-2.2144-1.2472-.51844A4.729,4.729,0,0,0,12.75116,7.3384ZM11.69174,9.75607c0,.24367-.35128.50052-.95462.70306-.06913.02322-.14243.04485-.21787.06649-.0791.02264-.16136.04428-.2479.06484a9.89613,9.89613,0,0,1-2.27321.2421,9.88007,9.88007,0,0,1-2.27113-.2421c-.087-.02056-.16879-.0422-.24789-.06484-.07595-.02164-.1493-.04327-.21787-.067-.60335-.202-.95356-.45889-.95356-.70256V9.07936c.00789.008.02057.01426.03.02215a1.56682,1.56682,0,0,0,.22311.1609l.02006.01262A2.72481,2.72481,0,0,0,4.89,9.42434l.00631.00315c.02214.00947.04535.01842.06749.02744.03538.01318.07437.02529.11026.03741.06226.0227.125.04535.18987.06592.0227.00743.04327.01583.06749.02321.01161.00372.02586.00687.03905.01059.12344.03583.2537.06857.38925.09758.02952.00682.057.01318.08755.01949.144.0306.29432.05747.44779.08068.02953.00474.06012.00845.0897.01268.14186.02056.28587.038.434.05324l.07015.008c.16248.01476.32756.02687.49156.03532.03747.00158.07437.00265.11133.00473.16874.00738.33861.01217.50633.01217.16823,0,.337-.00479.50684-.01217L8.61523,9.899c.16508-.00845.33016-.02056.49315-.03532l.06857-.008c.14823-.01476.29325-.03268.43618-.05324.02952-.00423.06012-.00794.0902-.01268q.2302-.03481.44622-.08068c.03059-.00631.059-.01267.08862-.01949.13448-.029.26367-.06175.38762-.09657.01375-.00473.029-.00788.0422-.01211.02321-.00687.04327-.01527.06648-.0227.06592-.02057.1271-.04322.19037-.06592.03482-.01212.07386-.02423.10818-.03691.02315-.009.04636-.01791.06856-.02794l.00789-.00315A2.744,2.744,0,0,0,11.417,9.275c.00845-.00422.01476-.00946.02164-.01369a1.651,1.651,0,0,0,.222-.15927c.009-.00794.02164-.01476.0311-.02271Zm0-1.76058c0,.24367-.35128.50053-.95462.70307-.06913.02321-.14243.04485-.21787.06648-.0791.02265-.16136.04429-.2479.06485A9.89675,9.89675,0,0,1,7.99814,9.072,9.88068,9.88068,0,0,1,5.727,8.82989c-.087-.02056-.16879-.0422-.24789-.06485-.07595-.02163-.1493-.04327-.21787-.067-.60335-.202-.95356-.45889-.95356-.70256v-.6767c.00789.00789.02057.01426.03.02214a1.56588,1.56588,0,0,0,.22311.16085l.02006.01268A2.71639,2.71639,0,0,0,4.89,7.66371l.00631.00321c.02214.00946.04535.01842.06749.02738.03538.01318.07437.02479.11026.03746.06226.02271.125.04536.18987.06592.0227.00738.04327.01634.06749.02321l.03905.0111c.12344.03533.2537.0675.38925.097.02952.00637.057.01319.08755.01955.144.03059.29432.05747.44779.08119l.0897.01217c.14186.02056.28587.038.434.05324l.07015.00794c.16248.01527.32756.02688.49156.03533.03747.00158.07437.00315.11133.00529.16874.00682.33861.01155.50633.01155.16823,0,.337-.00473.50684-.01155.037-.00214.07335-.00371.11025-.00529.16508-.00845.33016-.02006.49315-.03533L9.177,8.09516c.14823-.01476.29325-.03268.43618-.05324.02952-.00423.06012-.00795.0902-.01217q.2302-.03558.44622-.08119c.03059-.00636.059-.01318.08862-.01955q.20172-.04428.38762-.09651c.01375-.00473.029-.00789.0422-.01211.02321-.00637.04327-.01533.06648-.02271.06592-.02056.1271-.04321.19037-.06592.03482-.01267.07386-.02428.10818-.0369.02315-.009.04636-.018.06856-.02794l.00789-.00321a2.73533,2.73533,0,0,0,.3075-.14925c.00845-.00422.01476-.00946.02164-.01369a1.65655,1.65655,0,0,0,.222-.15933c.009-.00789.02164-.0142.0311-.02265Zm-.95412-1.05012c-.07014.02372-.14242.04586-.21888.067-.0791.02265-.16141.04428-.24789.06484a9.89648,9.89648,0,0,1-2.2722.24159A9.88494,9.88494,0,0,1,5.728,7.0772c-.08648-.02056-.16874-.04219-.24734-.06434-.077-.02163-.1493-.04377-.21888-.06749-.60233-.20147-.95361-.45889-.95361-.70256,0-.509,1.51532-1.07542,3.69045-1.07542,2.17676,0,3.69366.56644,3.69366,1.07542C11.69231,6.48648,11.341,6.7439,10.73762,6.94537Z"/>
              </svg>
                
                {children}

              </div>
              
      
            </button>
          </div>
                
        );

      }      
      
    
    }

    const SelectDrop = ({ubicaciones}) => {

      const [selectedOption, setSelectedOption] = useState(''); // Declare a state variable...
      // ...
      const optionClassName = ``;
      const selectClassName = `border border-slate-500 bg-neutral-50 rounded-md p-2 w-1/3 h-8 text-xs font-light`;

      const handleChange = (event) =>{
        
               
        setSelectedOption(event.target.value);
        console.log("option changed!")
        console.log(event.target.value)
        
        
      }

      return (
        <select
                  name="selectedUbId"
                  value={selectedOption} // ...force the select's value to match the state variable...
                  onChange={e=> handleChange(e)} // ... and update the state variable on any change!
                  className={selectClassName + ``}
                >
                    <option value="0">Seleccione una ubicación</option>
                  {
        
                    ubicaciones.map((ub) => (
                      <option key={`ub-key-${ub.id}`} 
                        value={ub.id} 
                      >{ub.name}
                      </option>
        
        
                    ))  
        
                  }
        </select>
      );
    }

    function CancelProcessing() {
                 
      setAction(null);
      setContact("");
      setLoading(false);
      setServiceId(null);
      setShowModal(false);
      setShowServiceAction(false);
    
      

    }
  
  
    useEffect(() => {

      //this blocks the app from scrolling
      //document.body.style.overflow = "hidden";

      function createOptions() {
          
        return {
                   
          servId: serviceId,           
        };
      }
      
      const options = createOptions();

      if(!options){

        setServiceContent("");
        setError("no se recibieron todos los parametros.")
        //setMessage("no se recibieron los parametros correctos.")
        
      } else {

            

        UserService.getService(options.servId).then(

          (response) => {

            console.log(response);
            console.log(response?.data);
            
            setServiceContent(response?.data);
            
            //setAvgResult(response.data.service)
            setMessage(response?.data.message);
            
            setShowServiceAction(true);
            setLoading(false);
             
            
          
          
          },

          (error) => {
            const _content =
              (error?.response && error?.response.data) ||
              error?.message ||
              error?.toString();
            
            setError(_content);
            
            
          
          }
        
        )
          
      }  
        
     
     
  
    }, [serviceId]);

    
    return (
      
      <div className="flex flex-col mx-auto bg-neutral-100 w-11/12 rounded-md shadow-md border border-slate-700 p-2 overflow-x-auto ">
          
              <h2 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Accion correctiva - mala calificacion  </h2>
              <p className="text-sm md:text-md mb-0">Servicio: {serviceContent.service?.name} </p>
              {loading && (
                
                <div className="flex">
                  <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>

              )}
              {serviceContent ? (   
                <div className="mx-auto mt-2 w-full">

                  <form onSubmit={handleSubmit} className="m-2 border border-slate-500 rounded-md shadow-lg bg-neutral-100 p-4">
                    <div className="flex flex-col ">
                      <label className={labelClass}>Accion:&nbsp;
                        <select name="action" value={action} onChange={handleAction} className={inputClass}>
                          <option value="none">Seleccione una acción</option>

                          <option value="asignar-tarea">Asignar tarea</option>
                        </select>
                      </label>

                      <label className={labelClass}>Responsable:&nbsp;
                        <select name="user_id" value={contact} onChange={handleContact} className={inputClass}>
                          <option value="none">Seleccione un contacto</option>
                          {serviceContent.contacts.map((contact)=>(
                              <option key={"opt-contacts-"+contact.id} value={contact.user_id}>{contact.firstname+" "+contact.lastname}</option>
                            ))
                          
                          }
                        </select>
                      </label>
                      <label className={labelClass}>Tarea:&nbsp;
                        <input type="text" className={inputClass} name="task" value="Atender reclamo UR" disabled/>
                      </label>

                      <label className={labelClass}>Observaciones:<br/>
                        <textarea
                          className={inputClass}
                          name="description"
                          cols="30"
                          
                          value={obs}
                          onChange={(e) => setObs(e.target.value)}
                          
                        />
                      </label>
                      <SaveActionButton>Procesar</SaveActionButton>
                                              
                      
                    </div>

                  </form>        
                </div>

              ): (
                <div className="flex">
                  <svg className="animate-spin h-4 w-4 fill-slate-600" viewBox="0 0 24 24">
                    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                  </svg>
                  <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                </div>
              )}
            
                           
      </div>
 
    );
  
  }

  const CloseModalButton=()=>{

  function HandleClick(){
    setShowServiceResult(false);
    setShowServiceAction(false);
    setShowModal(false);
    setServiceId(null);
    setUxId(null);
  }

  return(
    <div id="div-closeModalButt" className="flex justify-end content-start">
      <button id="closeModalButt" 
        className="m-2 border border-neutral-300 bg-white text-slate-700 font-light text-xs p-2 rounded-md hover:bg-neutral-400 hover:text-white " 
        onClick={HandleClick}>[X] Cerrar
      </button>
    </div>
  );
  }

    
  return (
    
      <Template>
        <div 
          className={`  `+wrapperClass}>
          
        
          <div className={`flex flex-col 
                      
                      
                      
          `} >
            
            <h1 className="text-zinc-600 text-2xl md:text-3xl lg:text-4xl">Mi Experiencia de Usuario</h1>

                {info && (
                  
                  <AlertBox message={message} type="info"/>
                  /*<div className="form-group">
                    <div className="alert alert-info" role="alert">
                      {message}
                    </div>
                  </div>*/
                )}
                
                {error && (
                  <AlertBox message={message} type="error"/>
                  /*<div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  </div>*/
                )}
              
                  {user ? (

                    <>
                      <div className={`${!showModal ? (` `):(` hidden `)}`}>
                        
                        <UbicacionPicker  user={user}/>

                        {showServices &&(

                          <div className="">
                            
                                                        
                            <ShowServices  ubicacionId={ubicacionId}/>

                          </div>


                        )}

                        
                        
                      
                      
                      </div>
                      
                      {showServiceResult && (
                        <div className="mx-auto">
                          <div className={`absolute top-0 left-0 z-30 bg-slate-600 opacity-80 w-full h-full  ${showModal ? (`  `) : (` hidden `)}`}>

                            
                          </div>
                        
                          <div className={`absolute top-0 left-0 z-50 w-full mx-auto h-fit items-start  ${showModal ? (`  `) : (` hidden `)}`}>                      
                            <CloseModalButton/>
                            <ServiceResult serviceId={serviceId}/>
                            

                          </div>
                        

                      </div>
                      )}
                      {showServiceAction && (
                        <div className="mx-auto">
                          <div className={`absolute top-0 left-0 z-30 bg-slate-600 opacity-80 w-full h-full  ${showModal ? (`  `) : (` hidden `)}`}>

                            
                          </div>
                        
                          <div className={`absolute top-0 left-0 z-50 w-full mx-auto h-fit items-start  ${showModal ? (`  `) : (` hidden `)}`}>                      
                            <CloseModalButton/>
                            <ServiceAction serviceId={serviceId} uxId={uxId}/>
                            

                          </div>
                        

                      </div>
                      )}
                      
                      {loading && (
                          <div className="flex">
                            <svg className="animate-spin h-10 w-10 fill-slate-600" viewBox="0 0 24 24">
                              <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                              <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                            </svg>
                            <span className="text-slate-700 font-extralight ml-2">Loading...</span>
                          </div>
  
                      )}

                    </>

                  ) : (
                  
            
                    <p>Favor <Link to="/Login"> ingrese </Link> para ver ubicaciones disponibles.</p>
            
                  )}
                                
          
          </div>   
          
          
              
        </div>

      </Template>
  );

  
};


