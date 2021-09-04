import React from 'react'
import nodataFound from '../styles/images/nodata-found.png'



function NoDataFound() {
    return (
            <div
                                className="row text-center"
                                style={{
                                    width: "99%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "50vh"
                                }}
                            >
                                <div className="col-10">
                                    <img
                                        src={nodataFound}
                                        className="img-responsive"
                                        alt=""
                                    />
                                </div>
                                <div className="col-10">
                                    <p>
                                        Aucune demande 
                                        <br /> pour le moment !
                                    </p>
                                </div>
                            </div>
    )
}
export default NoDataFound
