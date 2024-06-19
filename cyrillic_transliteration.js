"use strict";

const attString = `0	0	А	A
0	0	а	a
0	0	Ӓ	Ä
0	0	ӓ	ä
0	0	Ӓ̄	Ạ̈
0	0	ӓ̄	ạ̈
0	0	Ӑ	Ă
0	0	ӑ	ă
0	0	А̄	Ā
0	0	а̄	ā
0	0	Ӕ	Æ
0	0	ӕ	æ
0	0	А́	Á
0	0	а́	á
0	0	А̊	Å
0	0	а̊	å
0	0	Б	B
0	0	б	b
0	0	В	V
0	0	в	v
0	0	Г	G
0	0	г	g
0	0	Ґ	G̀
0	0	ґ	g̀
0	0	Ѓ	Ǵ
0	0	ѓ	ǵ
0	0	Ғ	Ġ
0	0	ғ	ġ
0	0	Ҕ	Ğ
0	0	ҕ	ğ
0	0	Һ	Ḥ
0	0	һ	ḥ
0	0	Д	D
0	0	д	d
0	0	Ђ	Đ
0	0	ђ	đ
0	0	Е	E
0	0	е	e
0	0	Ӗ	Ĕ
0	0	ӗ	ĕ
0	0	Ё	Ë
0	0	ё	ë
0	0	Є	Ê
0	0	є	ê
0	0	Ж	Ž
0	0	ж	ž
0	0	Җ	Ž̦
0	0	җ	ž̦
0	0	Җ	Ž̧
0	0	җ	ž̧
0	0	Ӝ	Z̄
0	0	ӝ	z̄
0	0	Ӂ	Z̆
0	0	ӂ	z̆
0	0	З	Z
0	0	з	z
0	0	Ӟ	Z̈
0	0	ӟ	z̈
0	0	Ӡ	Ź
0	0	ӡ	ź
0	0	Ѕ	Ẑ
0	0	ѕ	ẑ
0	0	И	I
0	0	и	i
0	0	Ӣ	Ī
0	0	ӣ	ī
0	0	И́	Í
0	0	и́	í
0	0	Ӥ	Î
0	0	ӥ	î
0	0	Й	J
0	0	й	j
0	0	І	Ì
0	0	і	ì
0	0	Ї	Ï
0	0	ї	ï
0	0	І̄	Ǐ
0	0	і̄	ǐ
0	0	Ј	J̌
0	0	ј	ǰ
0	0	Ј̵	J́
0	0	ј̵	j́
0	0	К	K
0	0	к	k
0	0	Ќ	Ḱ
0	0	ќ	ḱ
0	0	Ӄ	Ḳ
0	0	ӄ	ḳ
0	0	Ҝ	K̂
0	0	ҝ	k̂
0	0	Ҡ	Ǩ
0	0	ҡ	ǩ
0	0	Ҟ	K̄
0	0	ҟ	k̄
0	0	Қ	K̦
0	0	қ	k̦
0	0	Қ	Ķ
0	0	қ	ķ
0	0	К̨	K̀
0	0	к̨	k̀
0	0	Ԛ	Q
0	0	ԛ	q
0	0	Л	L
0	0	л	l
0	0	Љ	L̂
0	0	љ	l̂
0	0	Ԡ	L̦
0	0	ԡ	l̦
0	0	Ԡ	Ļ
0	0	ԡ	ļ
0	0	М	M
0	0	м	m
0	0	Н	N
0	0	н	n
0	0	Њ	N̂
0	0	њ	n̂
0	0	Ң	N̦
0	0	ң	n̦
0	0	Ң	Ņ
0	0	ң	ņ
0	0	Ӊ	Ṇ
0	0	ӊ	ṇ
0	0	Ҥ	Ṅ
0	0	ҥ	ṅ
0	0	Ԋ	Ǹ
0	0	ԋ	ǹ
0	0	Ԣ	Ń
0	0	ԣ	ń
0	0	Ӈ	Ň
0	0	ӈ	ň
0	0	Н̄	N̄
0	0	н̄	n̄
0	0	О	O
0	0	о	o
0	0	Ӧ	Ö
0	0	ӧ	ö
0	0	Ө	Ô
0	0	ө	ô
0	0	Ӫ	Ő
0	0	ӫ	ő
0	0	Ӧ̄	Ọ̈
0	0	о̄̈	ọ̈
0	0	Ҩ	Ò
0	0	ҩ	ò
0	0	О́	Ó
0	0	о́	ó
0	0	О̄	Ō
0	0	о̄	ō
0	0	Œ	Œ
0	0	œ	œ
0	0	П	P
0	0	п	p
0	0	Ҧ	Ṕ
0	0	ҧ	ṕ
0	0	Ԥ	P̀
0	0	ԥ	p̀
0	0	Р	R
0	0	р	r
0	0	С	S
0	0	с	s
0	0	Ҫ	Ș
0	0	ҫ	ș
0	0	Ҫ	Ş
0	0	ҫ	ş
0	0	С̀	S̀
0	0	с̀	s̀
0	0	Т	T
0	0	т	t
0	0	Ћ	Ć
0	0	ћ	ć
0	0	Ԏ	T̀
0	0	ԏ	t̀
0	0	Т̌	Ť
0	0	т̌	ť
0	0	Ҭ	Ț
0	0	ҭ	ț
0	0	Ҭ	Ţ
0	0	ҭ	ţ
0	0	У	U
0	0	у	u
0	0	Ӱ	Ü
0	0	ӱ	ü
0	0	Ӯ	Ū
0	0	ӯ	ū
0	0	Ў	Ŭ
0	0	ў	ŭ
0	0	Ӳ	Ű
0	0	ӳ	ű
0	0	У́	Ú
0	0	у́	ú
0	0	Ӱ̄	Ụ̈
0	0	ӱ̄	ụ̈
0	0	Ӱ̄	Ụ̄
0	0	ӱ̄	ụ̄
0	0	Ү	Ù
0	0	ү	ù
0	0	Ұ	U̇
0	0	ұ	u̇
0	0	Ԝ	W
0	0	ԝ	w
0	0	Ф	F
0	0	ф	f
0	0	Х	H
0	0	х	h
0	0	Ҳ	H̦
0	0	ҳ	h̦
0	0	Ҳ	Ḩ
0	0	ҳ	ḩ
0	0	Ц	C
0	0	ц	c
0	0	Ҵ	C̄
0	0	ҵ	c̄
0	0	Џ	D̂
0	0	џ	d̂
0	0	Ч	Č
0	0	ч	č
0	0	Ҷ	C̦
0	0	ҷ	c̦
0	0	Ҷ	Ç
0	0	ҷ	ç
0	0	Ӌ	C̣
0	0	ӌ	c̣
0	0	Ӵ	C̈
0	0	ӵ	c̈
0	0	Ҹ	Ĉ
0	0	ҹ	ĉ
0	0	Ч̀	C̀
0	0	ч̀	c̀
0	0	Ҽ	C̆
0	0	ҽ	c̆
0	0	Ҿ	C̨̆
0	0	ҿ	c̨̆
0	0	Ш	Š
0	0	ш	š
0	0	Щ	Ŝ
0	0	щ	ŝ
0	0	Ъ	ʺ
0	0	ъ	ʺ
0	0	Ы	Y
0	0	ы	y
0	0	Ӹ	Ÿ
0	0	ӹ	ÿ
0	0	Ы̄	Ȳ
0	0	ы̄	ȳ
0	0	Ь	ʹ
0	0	ь	ʹ
0	0	Э	È
0	0	э	è
0	0	Ә	A̋
0	0	ә	a̋
0	0	Ӛ	À
0	0	ӛ	à
0	0	Ю	Û
0	0	ю	û
0	0	Ю̄	Û̄
0	0	ю̄	û̄
0	0	Я	Â
0	0	я	â
0	0	Ѣ	Ě
0	0	ѣ	ě
0	0	Ѫ	Ǎ
0	0	ѫ	ǎ
0	0	Ѳ	F̀
0	0	ѳ	f̀
0	0	Ѵ	Ỳ
0	0	ѵ	ỳ
0	0	Ӏ	‡
0	0	ʼ	ʼ
0	0	ˮ	ˮ
0	0	!	!
0	0	"	"
0	0	#	#
0	0	$	$
0	0	%	%
0	0	&	&
0	0	'	'
0	0	(	(
0	0	)	)
0	0	*	*
0	0	+	+
0	0	,	,
0	0	-	-
0	0	.	.
0	0	/	/
0	0	:	:
0	0	;	;
0	0	<	<
0	0	=	=
0	0	>	>
0	0	?	?
0	0	@	@
0	0	[	[
0	0	\\	\\
0	0	]	]
0	0	^	^
0	0	_	_
0	0	\`	\`
0	0	{	{
0	0	|	|
0	0	}	}
0	0	~	~
0	0	 	 
0	0	’	’
0	0	‘	‘
0	0	—	—
0	0	«	«
0	0	»	»
0	0	0	0
0	0	1	1
0	0	2	2
0	0	3	3
0	0	4	4
0	0	5	5
0	0	6	6
0	0	7	7
0	0	8	8
0	0	9	9
0`;

let fst = new FST(attString);
// add transitions for whitespace symbols that could not be in the AT&T file due to their special function
for (let l of "\r\n\t") {
    fst.addTransition("0", "0", l, l);
}
fst.addTransition("0", "0", "\u00AD", "\u00AD")
let revFST = fst.reverse();
// If latin characters appear within Cyrillic script, simply leave them as they are.
// This needs to be done after the reversal so we do not break the reversed transliteration.
for (let l of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    fst.addTransition("0", "0", l, l);
}
  
function transliterate() {
    try {
        document.getElementById('latin_output').innerText =
        toStringRecursive(fst.transduce(document.getElementById("cyrillic_input").value));
    }
    catch(err) {
        if (err.message === "fst is undefined") {
            document.getElementById('testi').innerText =
            "Please choose an AT&T file before transliterating.";
        }
        else {
            document.getElementById('latin_output').innerText = err.name + ": " + err.message;
        }
    }
}

function transliterateReversed() {
    try {
        document.getElementById('cyrillic_output').innerText =
        toStringRecursive(revFST.transduce(document.getElementById("latin_input").value));
    }
    catch(err) {
        if (err.message === "fst is undefined") {
            document.getElementById('testi').innerText =
            "Please choose an AT&T file before transliterating.";
        }
        else {
            document.getElementById('cyrillic_output').innerText = err.name + ": " + err.message;
            throw err;
        }
    }
}
  