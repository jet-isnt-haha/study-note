/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
{
    var minWindow = function (s, t) {
        let start = [];
        let len = s.length + 1;
        let subStr = '';
        let map = new Map();
        for (const str of t) {
            map.set(str, (map.get(str) ?? 0) + 1);
        }
        for (let i = 0; i < s.length; ++i) {
            if (map.has(s[i])) {
                start.push(i);
                map.set(s[i], map.get(s[i]) - 1);
                while (true) {
                    let flag = true;
                    map.forEach(value => {
                        if (value > 0) {
                            flag = false;
                        }
                    })
                    if (flag) {
                        if (i - start[0] + 1 < len) {
                            len = i - start[0] + 1;
                            subStr = s.slice(start[0], i + 1);
                        }
                        map.set(s[start[0]], map.get(s[start.shift()]) + 1);

                    } else {
                        break;
                    }
                }
            }
        }
        return subStr;
    };
}


{
    function isCovered(cntS, cntT) {
        for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
            if (cntS[i] < cntT[i]) {
                return false;
            }
        }
        for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
            if (cntS[i] < cntT[i]) {
                return false;
            }
        }
        return true;
    }

    var minWindow = function (s, t) {
        const cntS = Array(128).fill(0); // s 子串字母的出现次数
        const cntT = Array(128).fill(0); // t 中字母的出现次数
        for (const c of t) {
            cntT[c.codePointAt(0)]++;
        }

        const m = s.length;
        let ansLeft = -1, ansRight = m;
        let left = 0;
        for (let right = 0; right < m; right++) { // 移动子串右端点
            cntS[s[right].codePointAt(0)]++; // 右端点字母移入子串
            while (isCovered(cntS, cntT)) { // 涵盖
                if (right - left < ansRight - ansLeft) { // 找到更短的子串
                    ansLeft = left; // 记录此时的左右端点
                    ansRight = right;
                }
                cntS[s[left].codePointAt(0)]--; // 左端点字母移出子串
                left++;
            }
        }
        return ansLeft < 0 ? "" : s.substring(ansLeft, ansRight + 1);
    };

}