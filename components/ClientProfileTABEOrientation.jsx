import React, { useState } from 'react';
import moment from 'moment/moment';
import { useClients } from '@/contexts/ClientsContext';
import InputLabel from '@/components/InputLabel';

function ClientProfileTabeOrientation() {
  const {selectedClient} = useClients();
  const [tabeOpen, setTabeOpen] = useState(false);
  const [orientationOpen, setOrientationOpen] = useState(false);
  const [dateValue, setDateValue] = useState('');

  const handleChange = (e) => {
    setDateValue(e.target.value);
  }

  const handleTabeSave = async () => {
    const res = await fetch(`/api/tabe`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: selectedClient._id,
        completedDate: dateValue,
      }),
      method: 'POST'
    })
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
    }else {
      console.log("data", data);
      setDateValue('');
      setTabeOpen(false);
    }

  }

  const handleOrientationSave = async () => {
    const res = await fetch(`/api/orientation`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: selectedClient._id,
        completedDate: dateValue,
      }),
      method: 'POST'
    })
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
    }else {
      console.log("data", data);
      setDateValue('');
      setOrientationOpen(false);
    }

  }

  function hasValidKey(obj, key) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key) && !!obj[key];
  }

  const skeletonPlaceholder = () => {
    return (
      <div className={`w-1/2 h-full mr-8`}>
        <div className="font-semibold mb-4 w-18 h-[19px] bg-base-300 rounded"/>
        <div className={`flex justify-start gap-10`}>
          <div>
            <div className={`text-sm font-light w-24 h-4 bg-base-300 rounded mb-1.5`}/>
            <div className={`text-sm font-light w-36 h-6 bg-base-300 rounded`}/>
          </div>
          <div>
            <div className={`text-sm font-light w-24 h-4 bg-base-300 rounded mb-1.5`}/>
            <div className={`text-sm font-light w-36 h-6 bg-base-300 rounded`}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        selectedClient && (hasValidKey(selectedClient, "tabe") || hasValidKey(selectedClient, "orientation")) && (
          <div className={`flex justify-items-start divide-x divide-base-content/10 w-full mt-6 bg-base-200 rounded-lg p-6 ${hasValidKey(selectedClient, 'tabe') || hasValidKey(selectedClient, 'orientation') ? 'visible' : 'hidden'}`}>
            {
              hasValidKey(selectedClient, 'tabe') ? (
                <div className={`w-1/2 mr-8`}>
                  <div className="font-semibold mb-2">TABE</div>
                  <div className={`flex justify-start gap-10`}>
                    <div>
                      <div className={`text-sm font-light`}>Date Referred</div>
                      {moment(selectedClient.tabe.dateReferred).format('MMMM Do, YYYY')}
                    </div>
                    <div>
                      <div className={`text-sm font-light ${tabeOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Date Completed</div>
                      {
                        selectedClient.tabe.completedDate
                          ? <div>{moment(selectedClient.tabe.completedDate).format('MMMM Do, YYYY')}</div>
                          : (<div>
                              <div onClick={() => setTabeOpen(!tabeOpen)} className={`text-secondary underline cursor-pointer font-light ${tabeOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Enter complete date</div>
                            <div className={`flex gap-4 items-baseline ${tabeOpen ? 'visible' : 'invisible h-0 collapse overflow-hidden'}`}>
                              <InputLabel className={``} type={`date`} name={`tabe`}
                                           value={dateValue} handleChange={handleChange} label="Date Completed" />
                              <button onClick={handleTabeSave} className={`inline text-secondary/50 hover:text-secondary underline text-xs font-light ${tabeOpen ? 'visible' : 'invisible'}`}>Save</button>

                            </div>
                            </div>)
                      }

                    </div>
                  </div>
                </div>
              ) : <div className={`w-1/2`}>{skeletonPlaceholder()}</div>
            }
            {
              hasValidKey(selectedClient, 'orientation') ? (
                <div className={`w-1/2 ml-8`}>
                  <div className="font-semibold mb-2">Orientation</div>
                  <div className={`flex justify-start gap-10`}>
                    <div>
                      <div className={`text-sm font-light`}>Date Referred</div>
                      {moment(selectedClient.orientation.dateReferred).format('MMMM Do, YYYY')}
                    </div>
                    <div>
                      <div className={`text-sm font-light ${orientationOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Date Completed</div>
                      {
                        selectedClient.orientation.completedDate
                          ? <div>{moment(selectedClient.orientation.completedDate).format('MMMM Do, YYYY')}</div>
                          : (<div>
                            <div onClick={() => setOrientationOpen(!orientationOpen)} className={`text-secondary underline cursor-pointer font-light ${orientationOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Enter complete date</div>
                            <div className={`flex gap-4 items-baseline ${orientationOpen ? 'visible' : 'invisible h-0 collapse overflow-hidden'}`}>
                              <InputLabel className={``} type={`date`} name={`orientation`}
                                          value={dateValue} handleChange={handleChange} label="Date Completed" />
                              <button onClick={handleOrientationSave} className={`inline text-secondary/50 hover:text-secondary underline text-xs font-light ${orientationOpen ? 'visible' : 'invisible'}`}>Save</button>

                            </div>
                          </div>)
                      }

                    </div>
                  </div>
                </div>
              ) : <div className={`w-1/2`}>{skeletonPlaceholder()}</div>
            }
          </div>
        )
      }
    </div>
  );
}

export default ClientProfileTabeOrientation;
