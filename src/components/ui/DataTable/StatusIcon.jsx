import React from 'react';
import { string } from 'prop-types';
import Icon from 'components/ui/Icon';
import pause from 'static/img/pause-icon.png';
import play from 'static/img/play-icon.png';


const StatusIcon = ({ value }) => {
  if (!value) return null;

  const src = value === 'new' ? play : pause;
  return <Icon src={src} />;
};

StatusIcon.propTypes = {
  value: string.isRequired,
};

export default StatusIcon;
