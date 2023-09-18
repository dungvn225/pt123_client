
export const  addMinMax=(arr)=> {
    arr.forEach(item => {
      const valueArr = item.value.split(' ');
      if (valueArr[0] === 'Dưới') {
        item.min = 0;
        item.max = parseInt(valueArr[1]);
      } else if (valueArr[0] === 'Trên') {
        item.min = parseInt(valueArr[1]);
        item.max = 9999;
      } else {
      
        item.min = parseInt(valueArr[1]);
        item.max = parseInt(valueArr[3]);
      }
    });
    return arr;
  }
  

  export const getCodes=(arr,number)=>{ 
    arr=addMinMax(arr);  
    let code= '';
    arr.forEach(item => {
          if(+number >= item.min  && +number < item.max){
              code= item.code;
          }
     });

     return code;
  }

 