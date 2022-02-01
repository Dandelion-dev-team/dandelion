import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import '../styles/App.scss'
import Card from '../components/projectCard';

export default function Data() {
  const [projectList, setData] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    fetch("http://localhost:3000/projects", {
      method: "GET",
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
    }).then(response => response.json())
      .then(
        data => setData(data[0])).then(console.log(projectList))
  }, []);

  return (
    <div>
      <Header />
      <div className="about">
        <div className="container">
          <div className="hero-section">
            <div className="heading">
              <h3>Data Page</h3>
            </div>
            <div className="content">
              {projectList ?
                projectList.map(function (d, idx) {
                  return (
                    <Card key={idx} title={d.title} description={d.description} image={d.project_image_link}></Card>)
                })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}