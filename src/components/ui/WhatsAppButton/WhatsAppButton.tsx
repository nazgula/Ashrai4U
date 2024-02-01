import React, { SyntheticEvent, useCallback } from 'react';
import { Icon } from '@/components/ui'

export const WhatsAppButton = () => {

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(+9728365512)}`;
    window.open(whatsappUrl, '_blank');
  };



  return (

    <div className="flex flex-col items-center justify-center w-full" onClick={handleWhatsAppClick}>
      <Icon
        className="flex-grow mt-4 lg:mt-16 w-28 h-28"
        
        // size={'35%'}
        icon="whatsapp"
      />
    </div>
    );
};
