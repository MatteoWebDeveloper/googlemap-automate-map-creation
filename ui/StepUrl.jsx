import { h } from 'preact';
import { Input } from 'antd';
import { CompassTwoTone } from '@ant-design/icons';

export function StepUrl ({ onChange }) {
    return (
        <section class="app__section">
            <div class="app__instructions-layout">
                <h2>Where do you wish I do the work?</h2>
                <p class="app__instructions">You need to first create a map in <a href="https://www.google.com/maps/d/u/0/" target="_blank">google map</a>. Then you can copy the link in the input below so that we know where to do the work.</p>
            </div>
            
            <label class="app__step-url-label">
                <Input 
                    prefix={<CompassTwoTone />}
                    name="google-map-page" 
                    placeholder="Google map link" 
                    size="large"
                    onChange={onChange} 
                />
            </label>
        </section>
    )
}