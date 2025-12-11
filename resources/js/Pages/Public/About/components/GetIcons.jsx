import * as Icons from "lucide-react";
 
 const getIcon = (iconName, size = 48, className) => {
    if (!iconName) return null;
    
    const IconComponent = Icons[iconName];
    
    return IconComponent ? <IconComponent size={size} className={className} /> : null;
  };

  export default getIcon