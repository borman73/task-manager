import Rails from '@rails/ujs';
import * as ActiveStorage from '@rails/activestorage';
import 'channels';
import 'material-design-lite/material.js';
import WebpackerReact from 'webpacker-react';
import App from 'App.js';

WebpackerReact.setup({ App });

Rails.start();
ActiveStorage.start();
