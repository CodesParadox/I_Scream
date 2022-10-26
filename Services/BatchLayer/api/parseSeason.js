module.exports = (date) => {
    let dateObj = new Date(date)
    switch (dateObj.getMonth()) {

        case 11:
        case 0:
        case 1:
            return "חורף"
        case 2:    
        case 3:    
        case 4:
            return "אביב"
        case 5:        
        case 6:        
        case 7:        
            return "קיץ"
        case 8:
        case 9:
        case 10:
            return "סתיו"
 
    
        default:
            break;
    }
}