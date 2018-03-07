module.exports = {
    convertNumber2Won: ( price ) => {
        price = price.toString();
        let result = '';
        for (let i = 4; i < price.length; i++) {
            let str = price.substring(price.length - i - 1, price.length - i);
            if (i == 4) str += '만';
            if (i == 7) str += ',';
            if (i == 8) str += '억 ';
            if (i == 11) str += ',';
            if (i == 12) str += '조 ';
            result = str + result;
        }
        result = result.replace(' 0,000억', '');
        result = result.replace(' 0,000만', '');
        result = result.replace('0,00', '');
        result = result.replace('0,0', '');
        result = result.replace('0,', '');
        return result;
    },
    houseType: {
        1: '아파트',
        2: '아파트 분양권',
        3: '원룸',
        4: '투룸',
        5: '쓰리룸',
        6: '연립',
        7: '다세대',
        8: '다가구',
        9: '오피스텔',
        10: '단독주택',
        11: '상가',
        12: '상가 분양권',
        13: '사무실',
        14: '오피스텔',
        15: '공장',
        16: '토지',
    },
    houseDealingType: {
        1: '매매',
        2: '전세',
        3: '월세',
    },
};
