/**
 * Challenge data for the CTF competition
 * 
 * Each challenge has:
 * - id: unique identifier
 * - title: display name
 * - description: challenge details
 * - category: type of challenge (Web, Crypto, Forensics, Reverse)
 * - difficulty: level (easy, medium, hard)
 * - points: score value
 * - flag: the solution (formatted as flag{...})
 * - hint: a clue to help solve the challenge
 */
export const challenges = [
  // EASY CHALLENGES
  {
    id: 'e1',
    title: 'Inspector Gadget',
    description: 'There\'s a secret message hidden in the source code of this website. Can you find it?',
    category: 'Web',
    difficulty: 'easy',
    points: 50,
    flag: 'flag{hidden_in_plain_sight}',
    hint: 'Right-click and inspect the HTML source code of the page. The flag is commented out.'
  },
  {
    id: 'e2',
    title: 'Base64 Basics',
    description: 'Decode this message: ZmxhZ3tiYXNlNjRfZGVjb2Rpbmdfc2tpbGxzfQ==',
    category: 'Crypto',
    difficulty: 'easy',
    points: 50,
    flag: 'flag{base64_decoding_skills}',
    hint: 'Base64 is a common encoding method. Try an online decoder.'
  },
  {
    id: 'e3',
    title: 'Cookie Monster',
    description: 'The flag is stored in a browser cookie. Can you find it?',
    category: 'Web',
    difficulty: 'easy',
    points: 50,
    flag: 'flag{cookies_are_tasty}',
    hint: 'Check your browser\'s developer tools under the Application or Storage tab.'
  },
  {
    id: 'e4',
    title: 'Hexadecimal Mystery',
    description: 'Convert this hexadecimal value to text: 666c61677b6865785f69735f6a7573745f6261736531367d',
    category: 'Crypto',
    difficulty: 'easy',
    points: 50,
    flag: 'flag{hex_is_just_base16}',
    hint: 'Hexadecimal is base-16. Each pair of characters represents one byte or ASCII character.'
  },
  {
    id: 'e5',
    title: 'Password Reset',
    description: 'We found this password reset email in the spam folder: p@$$w0rd123. What\'s the flag?',
    category: 'Forensics',
    difficulty: 'easy',
    points: 50,
    flag: 'flag{p@$$w0rd123}',
    hint: 'The password itself is the flag. Don\'t overthink it!'
  },

  // MEDIUM CHALLENGES
  {
    id: 'm1',
    title: 'Caesar\'s Secret',
    description: 'This message is encrypted with a Caesar cipher: iodj{urwdwlrq_flskhuv_duh_zhdn}',
    category: 'Crypto',
    difficulty: 'medium',
    points: 100,
    flag: 'flag{rotation_ciphers_are_weak}',
    hint: 'Caesar ciphers shift each letter by a fixed amount. Try different shifts.'
  },
  {
    id: 'm2',
    title: 'JavaScript Injection',
    description: 'The login form is vulnerable to injection. Can you bypass it without knowing the password?',
    category: 'Web',
    difficulty: 'medium',
    points: 100,
    flag: 'flag{javascript_validation_bypass}',
    hint: 'Examine the login function in the page\'s JavaScript. Can you modify variables in the console?'
  },
  {
    id: 'm3',
    title: 'Steganography 101',
    description: 'There\'s a hidden message in this image. Extract the flag.',
    category: 'Forensics',
    difficulty: 'medium',
    points: 100,
    flag: 'flag{hidden_in_image_data}',
    hint: 'Try using online steganography tools to extract hidden text from the image.'
  },
  {
    id: 'm4',
    title: 'Binary Conversion',
    description: 'Convert this binary to ASCII: 01100110 01101100 01100001 01100111 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01011111 01100011 01101111 01101110 01110110 01100101 01110010 01110011 01101001 01101111 01101110 01111101',
    category: 'Crypto',
    difficulty: 'medium',
    points: 100,
    flag: 'flag{binary_conversion}',
    hint: 'Each 8-bit (byte) sequence represents one ASCII character.'
  },
  {
    id: 'm5',
    title: 'Reverse Engineering',
    description: 'Analyze this JavaScript function: function _0x4f2a(){return _0x1b4d.reverse().join("")}. What does it output when _0x1b4d = ["}","e","s","r","e","v","e","r","_","s","i","_","t","i","{","g","a","l","f"]?',
    category: 'Reverse',
    difficulty: 'medium',
    points: 100,
    flag: 'flag{it_is_reverse}',
    hint: 'The function reverses an array and joins it into a string. Try following the operations step by step.'
  },

  // HARD CHALLENGES
  {
    id: 'h1',
    title: 'SQL Injection',
    description: 'There\'s a vulnerable admin login form at /admin. Can you bypass it with SQL injection?',
    category: 'Web',
    difficulty: 'hard',
    points: 150,
    flag: 'flag{sql_injection_master}',
    hint: 'Try common SQL injection patterns like \' OR 1=1 -- to manipulate the query logic.'
  },
  {
    id: 'h2',
    title: 'Hash Cracking',
    description: 'Crack this MD5 hash: 5f4dcc3b5aa765d61d8327deb882cf99',
    category: 'Crypto',
    difficulty: 'hard',
    points: 150,
    flag: 'flag{password}',
    hint: 'This is a common password hash. Try online rainbow tables or hash lookup services.'
  },
  {
    id: 'h3',
    title: 'Network Packet Analysis',
    description: 'Analyze the network traffic capture to find the data exfiltration attempt.',
    category: 'Forensics',
    difficulty: 'hard',
    points: 150,
    flag: 'flag{packet_inspector_pro}',
    hint: 'Look for unusual HTTP requests with encoded data in the headers or payload.'
  },
  {
    id: 'h4',
    title: 'JavaScript Deobfuscation',
    description: 'This code contains the flag: eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!\'\'.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return\'\\\\w+\'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}return p}(\'f{g h i j}\',[],10,\'flag|deobfuscation|javascript|skills\'.split(\'|\'),0,{}))',
    category: 'Reverse',
    difficulty: 'hard',
    points: 150,
    flag: 'flag{javascript_deobfuscation_skills}',
    hint: 'This is JavaScript packed code. Try running it in a console or using an online unpacker.'
  },
  {
    id: 'h5',
    title: 'XOR Encryption',
    description: 'The flag has been XOR encrypted with the key "CTF". Ciphertext (hex): 3a0d1908531b1559000554024a1c0c15',
    category: 'Crypto',
    difficulty: 'hard',
    points: 150,
    flag: 'flag{xor_is_reversible}',
    hint: 'XOR is its own inverse. You can decrypt by XORing the ciphertext with the same key.'
  }
];

// Add the flag to localStorage when page loads
// This creates the "hidden" flag for the cookie challenge
document.addEventListener('DOMContentLoaded', function() {
  document.cookie = "secretFlag=flag{cookies_are_tasty}; path=/";
  
  // Add a comment with the flag for the "Inspector Gadget" challenge
  const commentWithFlag = document.createComment(" The flag for Inspector Gadget is: flag{hidden_in_plain_sight} ");
  document.documentElement.appendChild(commentWithFlag);
});