import React from "react";

const LanguageDropdown = ({ language, onLanguageChange }) => {
  return (
    <select
      className="p-2 border rounded outline-none focus:bg-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer [&_option]:bg-white"
      value={language}
      onChange={onLanguageChange}
    >
      <option value="af" disabled="true">
        Choose Language
      </option>
      <option value="af">Afrikaans</option>
      <option value="sq">Albanian</option>
      <option value="am">Amharic</option>
      <option value="ar">Arabic</option>
      <option value="hy">Armenian</option>
      <option value="as">Assamese</option>
      <option value="az">Azerbaijani (Latin)</option>
      <option value="bn">Bangla</option>
      <option value="ba">Bashkir</option>
      <option value="eu">Basque</option>
      <option value="bho">Bhojpuri</option>
      <option value="brx">Bodo</option>
      <option value="bs">Bosnian (Latin)</option>
      <option value="bg">Bulgarian</option>
      <option value="yue">Cantonese (Traditional)</option>
      <option value="ca">Catalan</option>
      <option value="lzh">Chinese (Literary)</option>
      <option value="zh-Hans">Chinese Simplified</option>
      <option value="zh-Hant">Chinese Traditional</option>
      <option value="sn">chiShona</option>
      <option value="hr">Croatian</option>
      <option value="cs">Czech</option>
      <option value="da">Danish</option>
      <option value="prs">Dari</option>
      <option value="dv">Divehi</option>
      <option value="nl">Dutch</option>
      <option value="en">English</option>
      <option value="et">Estonian</option>
      <option value="fo">Faroese</option>
      <option value="fj">Fijian</option>
      <option value="fil">Filipino</option>
      <option value="fi">Finnish</option>
      <option value="fr">French</option>
      <option value="fr-ca">French (Canada)</option>
      <option value="gl">Galician</option>
      <option value="ka">Georgian</option>
      <option value="de">German</option>
      <option value="el">Greek</option>
      <option value="gu">Gujarati</option>
      <option value="ht">Haitian Creole</option>
      <option value="ha">Hausa</option>
      <option value="he">Hebrew</option>
      <option value="hi">Hindi</option>
      <option value="mww">Hmong Daw (Latin)</option>
      <option value="hu">Hungarian</option>
      <option value="is">Icelandic</option>
      <option value="ig">Igbo</option>
      <option value="id">Indonesian</option>
      <option value="ikt">Inuinnaqtun</option>
      <option value="iu">Inuktitut</option>
      <option value="iu-Latn">Inuktitut (Latin)</option>
      <option value="ga">Irish</option>
      <option value="it">Italian</option>
      <option value="ja">Japanese</option>
      <option value="kn">Kannada</option>
      <option value="ks">Kashmiri</option>
      <option value="kk">Kazakh</option>
      <option value="km">Khmer</option>
      <option value="rw">Kinyarwanda</option>
      <option value="gom">Konkani</option>
      <option value="ko">Korean</option>
      <option value="ku">Kurdish (Central)</option>
      <option value="kmr">Kurdish (Northern)</option>
      <option value="ky">Kyrgyz (Cyrillic)</option>
      <option value="lo">Lao</option>
      <option value="lv">Latvian</option>
      <option value="lt">Lithuanian</option>
      <option value="ln">Lingala</option>
      <option value="lug">Luganda</option>
      <option value="mk">Macedonian</option>
      <option value="mai">Maithili</option>
      <option value="mg">Malagasy</option>
      <option value="ms">Malay (Latin)</option>
      <option value="ml">Malayalam</option>
      <option value="mt">Maltese</option>
      <option value="mi">Maori</option>
      <option value="mr">Marathi</option>
      <option value="mn-Cyrl">Mongolian (Cyrillic)</option>
      <option value="mn-Mong">Mongolian (Traditional)</option>
      <option value="my">Myanmar</option>
      <option value="ne">Nepali</option>
      <option value="nb">Norwegian Bokmål</option>
      <option value="nya">Nyanja</option>
      <option value="or">Odia</option>
      <option value="ps">Pashto</option>
      <option value="fa">Persian</option>
      <option value="pl">Polish</option>
      <option value="pt">Portuguese (Brazil)</option>
      <option value="pt-pt">Portuguese (Portugal)</option>
      <option value="pa">Punjabi</option>
      <option value="otq">Queretaro Otomi</option>
      <option value="ro">Romanian</option>
      <option value="run">Rundi</option>
      <option value="ru">Russian</option>
      <option value="sm">Samoan (Latin)</option>
      <option value="sr-Cyrl">Serbian (Cyrillic)</option>
      <option value="sr-Latn">Serbian (Latin)</option>
      <option value="st">Sesotho</option>
      <option value="nso">Sesotho sa Leboa</option>
      <option value="tn">Setswana</option>
      <option value="sd">Sindhi</option>
      <option value="si">Sinhala</option>
      <option value="sk">Slovak</option>
      <option value="sl">Slovenian</option>
      <option value="so">Somali (Arabic)</option>
      <option value="es">Spanish</option>
      <option value="sw">Swahili (Latin)</option>
      <option value="sv">Swedish</option>
      <option value="ty">Tahitian</option>
      <option value="ta">Tamil</option>
      <option value="tt">Tatar (Latin)</option>
      <option value="te">Telugu</option>
      <option value="th">Thai</option>
      <option value="bo">Tibetan</option>
      <option value="ti">Tigrinya</option>
      <option value="to">Tongan</option>
      <option value="tr">Turkish</option>
      <option value="tk">Turkmen (Latin)</option>
      <option value="uk">Ukrainian</option>
      <option value="hsb">Upper Sorbian</option>
      <option value="ur">Urdu</option>
      <option value="ug">Uyghur (Arabic)</option>
      <option value="uz">Uzbek (Latin)</option>
      <option value="vi">Vietnamese</option>
      <option value="cy">Welsh</option>
      <option value="xh">Xhosa</option>
      <option value="yo">Yoruba</option>
      <option value="yua">Yucatec Maya</option>
      <option value="zu">Zulu</option>
    </select>
  );
};

export default LanguageDropdown;
