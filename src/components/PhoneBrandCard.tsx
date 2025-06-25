
import React from 'react';
import { Link } from 'react-router-dom';

interface PhoneBrandCardProps {
  brand: string;
  icon: string;
  route: string;
}

const PhoneBrandCard: React.FC<PhoneBrandCardProps> = ({ brand, icon, route }) => {
  return (
    <Link to={route}>
      <div className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group">
        <div className="text-center">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
            {brand}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PhoneBrandCard;
