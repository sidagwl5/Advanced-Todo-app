import {
  apply,
  autoprefix,
  create,
  cssomSheet,
  cyrb32,
  directive,
  expandGroups,
  mode,
  noprefix,
  setup,
  silent,
  strict,
  theme,
  tw,
  voidSheet,
  warn
} from "./chunk-RR6IAFU2.js";
import "./chunk-AC2VUBZ6.js";

// node_modules/twind/css/css.js
var includes = (value, search) => !!~value.indexOf(search);
var join = (parts, separator = "-") => parts.join(separator);
var hyphenate = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
var evalThunk = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }
  return value;
};
var isCSSProperty = (key, value) => !includes("@:&", key[0]) && (includes("rg", (typeof value)[5]) || Array.isArray(value));
var merge = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk(source[key], context);
  if (isCSSProperty(key, value)) {
    target2[hyphenate(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes("figa", key[1]) ? (target2[key] || []).concat(value) : merge(target2[key] || {}, value, context);
  }
  return target2;
}, target) : target;
var escape = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
var buildMediaQuery = (screen2) => {
  if (!Array.isArray(screen2)) {
    screen2 = [screen2];
  }
  return "@media " + join(screen2.map((screen3) => {
    if (typeof screen3 == "string") {
      screen3 = { min: screen3 };
    }
    return screen3.raw || join(Object.keys(screen3).map((feature) => `(${feature}-width:${screen3[feature]})`), " and ");
  }), ",");
};
var translate = (tokens, context) => {
  const collect = (target, token) => Array.isArray(token) ? token.reduce(collect, target) : merge(target, evalThunk(token, context), context);
  return tokens.reduce(collect, {});
};
var newRule = /\s*(?:([\w-%@]+)\s*:?\s*([^{;]+?)\s*(?:;|$|})|([^;}{]*?)\s*{)|(})/gi;
var ruleClean = /\/\*[\s\S]*?\*\/|\s+|\n/gm;
var decorate = (selectors, currentBlock) => selectors.reduceRight((rules, selector) => ({ [selector]: rules }), currentBlock);
var saveBlock = (rules, selectors, currentBlock) => {
  if (currentBlock) {
    rules.push(decorate(selectors, currentBlock));
  }
};
var interleave = (strings, interpolations, context) => {
  let buffer = strings[0];
  const result = [];
  for (let index = 0; index < interpolations.length; ) {
    const interpolation = evalThunk(interpolations[index], context);
    if (interpolation && typeof interpolation == "object") {
      result.push(buffer, interpolation);
      buffer = strings[++index];
    } else {
      buffer += (interpolation || "") + strings[++index];
    }
  }
  result.push(buffer);
  return result;
};
var astish = (values, context) => {
  const selectors = [];
  const rules = [];
  let currentBlock;
  let match;
  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    if (typeof value == "string") {
      while (match = newRule.exec(value.replace(ruleClean, " "))) {
        if (!match[0])
          continue;
        if (match[4]) {
          currentBlock = saveBlock(rules, selectors, currentBlock);
          selectors.pop();
        }
        if (match[3]) {
          currentBlock = saveBlock(rules, selectors, currentBlock);
          selectors.push(match[3]);
        } else if (!match[4]) {
          if (!currentBlock)
            currentBlock = {};
          const value2 = match[2] && /\S/.test(match[2]) ? match[2] : values[++index];
          if (value2) {
            if (match[1] == "@apply") {
              merge(currentBlock, evalThunk(apply(value2), context), context);
            } else {
              currentBlock[match[1]] = value2;
            }
          }
        }
      }
    } else {
      currentBlock = saveBlock(rules, selectors, currentBlock);
      rules.push(decorate(selectors, value));
    }
  }
  saveBlock(rules, selectors, currentBlock);
  return rules;
};
var cssFactory = (tokens, context) => translate(Array.isArray(tokens[0]) && Array.isArray(tokens[0].raw) ? astish(interleave(tokens[0], tokens.slice(1), context), context) : tokens, context);
var css = (...tokens) => directive(cssFactory, tokens);
var keyframesFactory = (tokens, context) => {
  const waypoints = cssFactory(tokens, context);
  const id = cyrb32(JSON.stringify(waypoints));
  context.tw(() => ({ [`@keyframes ${id}`]: waypoints }));
  return id;
};
var keyframes = (...tokens) => directive(keyframesFactory, tokens);
var animation = (value, waypoints) => waypoints === void 0 ? (...args) => animation(value, keyframes(...args)) : css({
  ...value && typeof value == "object" ? value : { animation: value },
  animationName: typeof waypoints == "function" ? waypoints : keyframes(waypoints)
});
var screenFactory = ({ size, rules }, context) => {
  const media = buildMediaQuery(context.theme("screens", size));
  return rules === void 0 ? media : {
    [media]: typeof rules == "function" ? evalThunk(rules, context) : cssFactory([rules], context)
  };
};
var screen = (size, rules) => directive(screenFactory, { size, rules });

// node_modules/twind/style/style.js
var includes2 = (value, search) => !!~value.indexOf(search);
var hyphenate2 = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
var evalThunk2 = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }
  return value;
};
var isCSSProperty2 = (key, value) => !includes2("@:&", key[0]) && (includes2("rg", (typeof value)[5]) || Array.isArray(value));
var merge2 = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk2(source[key], context);
  if (isCSSProperty2(key, value)) {
    target2[hyphenate2(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes2("figa", key[1]) ? (target2[key] || []).concat(value) : merge2(target2[key] || {}, value, context);
  }
  return target2;
}, target) : target;
var escape2 = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
var styled$ = (rules, context) => rules.reduce((result, rule) => {
  if (typeof rule == "string") {
    rule = apply(rule);
  }
  if (typeof rule == "function") {
    return merge2(result, evalThunk2(rule, context), context);
  }
  if (rule) {
    return merge2(result, rule, context);
  }
  return result;
}, {});
var buildMediaRule = (key, value) => ({
  [key[0] == "@" ? key : `@screen ${key}`]: typeof value == "string" ? apply(value) : value
});
var createStyle = (config = {}, base) => {
  const { base: baseStyle, variants = {}, defaults, matches = [] } = config;
  const id = cyrb32(JSON.stringify([base == null ? void 0 : base.className, baseStyle, variants, defaults, matches]));
  const className = (base ? base.className + " " : "") + id;
  const selector = (base || "") + "." + id;
  return Object.defineProperties((allProps) => {
    const { tw: tw2, css: css2, class: localClass, className: localClassName, ...props } = {
      ...defaults,
      ...allProps
    };
    const rules = [
      base && base(props),
      {
        _: className + (localClassName ? " " + localClassName : "") + (localClass ? " " + localClass : "")
      },
      baseStyle
    ];
    Object.keys(variants).forEach((variantKey) => {
      const variant = variants[variantKey];
      const propsValue = props[variantKey];
      if (propsValue === Object(propsValue)) {
        Object.keys(propsValue).forEach((key) => {
          const value = variant[propsValue[key]];
          rules.push(key == "initial" ? value : buildMediaRule(key, value));
        });
      } else {
        rules.push(variant[propsValue]);
      }
    });
    matches.forEach((matcher) => {
      const ruleIndex = rules.push(matcher.use) - 1;
      if (!Object.keys(matcher).every((variantKey) => {
        const propsValue = props[variantKey];
        const compoundValue = String(matcher[variantKey]);
        if (propsValue === Object(propsValue)) {
          Object.keys(propsValue).forEach((key) => {
            if (key != "initial" && compoundValue == String(propsValue[key])) {
              rules.push(buildMediaRule(key, rules[ruleIndex]));
            }
          });
          return true;
        }
        return variantKey == "use" || compoundValue == String(propsValue);
      })) {
        rules.length = ruleIndex;
      }
    });
    rules.push(apply(tw2), css2);
    return directive(styled$, rules);
  }, {
    toString: {
      value: () => selector
    },
    className: {
      value: className
    },
    selector: {
      value: selector
    }
  });
};
var style = (base, config) => typeof base == "function" ? createStyle(config, base) : createStyle(base);
export {
  animation,
  apply,
  autoprefix,
  create,
  css,
  cssomSheet,
  directive,
  expandGroups,
  cyrb32 as hash,
  keyframes,
  mode,
  noprefix,
  screen,
  setup,
  silent,
  strict,
  style,
  theme,
  tw,
  voidSheet,
  warn
};
//# sourceMappingURL=twind_style.js.map
