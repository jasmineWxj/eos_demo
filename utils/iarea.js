

const maxner = (i1, i2, clist)=> {
    if(clist[i1]>clist[i2]){
        return [i1, i2]
    }else{
        return [i2, i1]
    }
}
function getMaxArea(clist){
    const { length } = clist;
    let startIndex = 0;
    let endIndex = length-1;
    let [cMaxIndex, cMinIndex] = maxner(startIndex,endIndex,clist);
    let maxArea =  clist[cMinIndex] * (endIndex - startIndex);
    let lastEnd;
    let lastStart;
    while(startIndex<endIndex){
        if(startIndex === cMaxIndex){
            lastEnd = endIndex;
            endIndex --;
            if(clist[enIndex] < clist[lastEnd]){
                continue;
            }
        }else{
            lastStart=startIndex;
            startIndex++;
            if(clist[startIndex]<clist[lastStart]){
                continue;
            }
        }
        let [cuMaxIndex, cuMinIndex] = maxner(startIndex,endIndex,clist);
        cMaxIndex = cuMaxIndex > cMaxIndex ? cuMaxIndex : cMaxIndex;
        let cuArea =  clist[cuMinIndex] * (endIndex - startIndex);
        if(maxArea<cuArea){
            maxArea = cuArea
        }
    }
    return maxArea
}


const clist = [1,8,6,2,5,4,8,3,7];

console.log(getMaxArea(clist));