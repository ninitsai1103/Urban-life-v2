export const STYLES = {
    WIDTH: "280px", 
    HEIGHT: "280px", 
    ONE_COLUMN_HEIGHT: "40px",
  
    // FontSize
    FONTSIZE_BASIC:"20px", 
    FONTSIZE_MEDIUM:"25px", 
    FONTSIZE_LARGE:"50px", 
  
    // color
    WEEKDAY_TEXT_COLOR:"grey",
    DATE_DAT_COLOR:"black"
  }
  
  // === calendar-container
  export const calendarContainer = {
    width:STYLES.WIDTH, 
    height:STYLES.HEIGHT,
    border: "black solid 1px", 
  }
  
  //===  Header  ===
  export const headerContainer = {
    width:STYLES.WIDTH, 
    height:STYLES.ONE_COLUMN_HEIGHT,
    // border: "black solid 1px", 
    display:"flex",
  }
  export const headerMonthYearStyle = {
    width: "80%",
    fontSize:STYLES.FONTSIZE_MEDIUM, 
    margin:"0.2rem 0.4rem", 
  }
  
  export const headerButtonStyle = {
    width: "10%",
    fontSize:STYLES.FONTSIZE_BASIC, 
    cursor: "pointer",
    margin:"0.4em", 
  }
  
  
  //===  WeekDay  ===
  export const weekDayContainerStyle = {
    width:STYLES.WIDTH, 
    height:STYLES.ONE_COLUMN_HEIGHT, 
    // border: "black solid 1px", 
    display: "flex",
  };
  
  export const weekDayStyle = {
    width:"100%",
    fontSize:STYLES.FONTSIZE_BASIC, 
    margin:"0.5rem", 
    color:STYLES.WEEKDAY_TEXT_COLOR 
  }
  
  //=== Date Content ===
  export const DateContainer = {
    width:STYLES.WIDTH, 
    height:"200px",
    // border: "black solid 1px", 
  };
  
  export const aWeekStyle = {
    display: "flex",
  };
  
  export const dayStyle = {
    width:"100%",
    fontSize:STYLES.FONTSIZE_BASIC, 
    margin:"0.5rem", 
    color:STYLES.DATE_DAT_COLOR,
    textAlign:"center",
  }