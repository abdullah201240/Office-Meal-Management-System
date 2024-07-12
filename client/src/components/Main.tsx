import React from 'react';
import Navbar from './Navbar';
import '../assets/css/Style.css'; // Import your CSS file
const mainMenuItems = [
  { name: 'Home', link: '/' },
  { name: 'Login', link: '/login' }
];

export default function Main() {
  return (
    <div className='background-radial-gradient'>
      <Navbar menuItems={mainMenuItems} />      <main className="main">
        {/* Menu Section */}
        <section>
          <div className="container">
            <div className="tab-content">
              <div>
                <div className="tab-header text-center">
                  <h3>Menu</h3>
                </div>
                <div className="row gy-5">
                  {/* Menu Item */}
                  <div className="col-lg-4">
                    <img src="/assets/img/menu/menu-item-1.png" alt="Menu Item 1" />
                    <h4>Magnam Tiste</h4>
                    <p className="ingredients">Lorem, deren, trataro, filede, nerada</p>
                    <p className="price">$5.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4">
                    <img src="/assets/img/menu/menu-item-2.png" alt="Menu Item 2" />
                    <h4>Aut Luia</h4>
                    <p className="ingredients">Lorem, deren, trataro, filede, nerada</p>
                    <p className="price">$14.95</p>
                  </div>
                  {/* Menu Item */}
                  <div className="col-lg-4">
                    <img src="/assets/img/menu/menu-item-3.png" alt="Menu Item 3" />
                    <h4>Est Eligendi</h4>
                    <p className="ingredients">Lorem, deren, trataro, filede, nerada</p>
                    <p className="price">$8.95</p>
                  </div>
                  {/* Repeat for other menu items */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Menu Section */}
      </main>
    </div>
  );
}
