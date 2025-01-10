'use client';

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface SocialIconRendererProps {
  platform: string;
}

const SocialIconRenderer: React.FC<SocialIconRendererProps> = ({ platform }) => {
  switch (platform) {
    case 'facebook':
      return <FaFacebookF className="text-blue-600" />;
    case 'twitter':
      return <FaTwitter className="text-blue-400" />;
    case 'instagram':
      return <FaInstagram className="text-pink-500" />;
    case 'whatsapp':
      return <FaWhatsapp className="text-green-500" />;
    default:
      return null;
  }
};

export default SocialIconRenderer;
