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
        className="flex-grow mt-12"
        viewBox="0 0 183 30"
        size={'100%'}
        icon="whatsapp"
      />
    </div>
    );
};
